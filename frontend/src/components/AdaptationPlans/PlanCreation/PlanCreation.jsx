import React, { useState } from 'react';
import style from './PlanCreation.module.scss';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import errorImg from '../../../img/error.png'
import moment from 'moment';
import 'moment/locale/ru';
import Autocomplete from 'react-autocomplete';
import  MomentLocaleUtils, { formatDate, parseDate }  from 'react-day-picker/moment';

const PlanCreation=(props)=>{
    const [range,setRange] = useState({});
    const [workerName, setWorkerName] = useState("");
    const [superName, setSuperName] = useState("");
    const [workerPosition, setWorkerPosition] = useState("");
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const createNewPlan = () => {
        props.createPlan(
            findID(workerName, props.workers), 
            findID(workerPosition, props.positions), 
            findID(superName, props.supers), 
            props.user_id,
            moment(range.from).format("DD.MM.YYYY"), 
            moment(range.to).format("DD.MM.YYYY"), 
            0, 
            null, 
            ''
        ).then((response)=>{
            if (!response) {
                setIsError(true);
                setErrMessage("План для этого сотрудника уже создан");
            }
            else props.setIsCreationOpen(false);
        });        
    }
    const findID = (value,list) => {
       return list.filter(item=> item.name===value)[0].id;
    }

    const isCreatable = () => {
        const isWorkerExist= props.workers.filter(item=> item.name===workerName).length!==0;
        const isSuperExist= props.supers.filter(item=> item.name===superName).length!==0;
        const isPositionExist= props.positions.filter(item=> item.name===workerPosition).length!==0;
        const isDateFull = !!(range.to);
        const isPlanExist = props.plans.some(item=> item.name === workerName);
        const isCreateError=!isWorkerExist || !isSuperExist || !isPositionExist || !isDateFull || isPlanExist
        isCreateError&&setIsError(true);
        if(!isCreateError) return true;
        if (workerName==""||workerPosition==""||superName==""||!range.to) setErrMessage('Заполните все поля');
        else {
            if ((!isWorkerExist || isPlanExist)&& isDateFull){ 
                setErrMessage('Данного работника не существует');
                setWorkerName("");
            }
            if (!isSuperExist) {
                setErrMessage('Данного руководителя не существует');
                setSuperName("");
            }
            if (!isPositionExist) {
                setErrMessage('Данной позиции не существует');
                setWorkerPosition("");
            }
            if (!isDateFull) {
                setErrMessage('Выберите период полностью');
            }
        }
        
        return false;
    }

    return(  
        <div className={style.fixed}>
            <div className={style.container}>
                <div onClick={()=>props.setIsCreationOpen(false)} className={style.close}></div>
                <h2 className={style.title}>Добавить план</h2>
                <table >
                    <tr>
                        <td><div className={style.fieldName}> Сотрудник:</div></td>
                        <td>
                            <Autocomplete
                                getItemValue={(item)=> item.label}
                                items={
                                   props.workers.map(worker=> ({label:worker.name}))
                                } 
                                renderItem={(item, isHighlighted)=>
                                <div style={{background: isHighlighted? 'rgba(140, 197, 71, 0.5)':'white'}}>
                                    {item.label}
                                </div>}
                                value={workerName}
                                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                inputProps={
                                    isError&&(workerName=="") ?
                                        {className: style.errorInput,
                                        placeholder:"Выберите корректные данные из списка"}
                                        : {placeholder:'Имя сотрудника' }
                                    
                                    
                                }
                                onChange={(e)=> setWorkerName(e.target.value)}
                                onSelect={(val)=> setWorkerName(val)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><div className={style.fieldName}> Должность сотрудника:</div></td>
                        <td>
                        <Autocomplete
                                getItemValue={(item)=> item.label}
                                 items={
                                        props.positions.map(position=> ({label:position.name}))
                                 } 
                                renderItem={(item, isHighlighted)=>
                                <div style={{background: isHighlighted? 'rgba(140, 197, 71, 0.5)':'white'}}>
                                    {item.label}
                                </div>}
                                value={workerPosition}
                                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                inputProps={
                                    isError&&(workerPosition=="") ?
                                        {className: style.errorInput,
                                        placeholder:"Выберите корректные данные из списка"}
                                        : {placeholder:'Должность сотрудника'}
                                    
                                }
                                onChange={(e)=> setWorkerPosition(e.target.value)}
                                onSelect={(val)=> setWorkerPosition(val)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><div className={style.fieldName}> Руководитель: </div></td>
                        <td>
                             <Autocomplete
                                getItemValue={(item)=> item.label}
                                items={
                                    props.supers.map(item=>({label:item.name}))
                                } 
                                renderItem={(item, isHighlighted)=>
                                <div style={{background: isHighlighted? 'rgba(140, 197, 71, 0.5)':'white'}}>
                                    {item.label}
                                </div>}
                                value={superName}
                                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                inputProps={
                                    isError&&(superName=="") ?
                                        {className: style.errorInput,
                                        placeholder:"Выберите корректные данные из списка"}
                                        : {placeholder:'Имя руководителя'}
                                    
                                }
                                onChange={(e)=> setSuperName(e.target.value)}
                                onSelect={(val)=> setSuperName(val)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><div className={style.fieldName}> Период:</div></td>
                        <td>
                            <DayPickerInput 
                                component={props =><input 
                                    className={(isError&&!range.to) ? style.errorInput : style.periodInput}
                                    {...props}
                                />}
                                placeholder="Период"
                                formatDate ={formatDate}
                                parseDate={parseDate}
                                hideOnDayClick={!!range.to}
                                value = {!!(range.to) ?
                                    moment(range.from).format("DD.MM.YYYY") + "-" + moment(range.to).format("DD.MM.YYYY")
                                    :""}
                                dayPickerProps={{
                                    localeUtils:MomentLocaleUtils,
                                    locale:"ru",
                                    selectedDays:range,
                                    onDayClick:((day)=> setRange(range => DateUtils.addDayToRange(day,range)))
                                }}  
                            />
                        </td>
                    </tr>
                </table>
                <div className={style.btnWrapper}>
                    {isError&&(<div style={{display:'flex'}}>
                        <img src={errorImg} alt="error"/>
                        <p>{errMessage}</p>
                    </div>) } 
                    <button className={style.addBtn}
                     onClick={()=> isCreatable() && createNewPlan()}>Создать</button>
                </div>
            </div>
        </div>
    )
}

export default PlanCreation;