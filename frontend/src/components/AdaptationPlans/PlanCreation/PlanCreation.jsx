import React, { useState } from 'react';
import style from './PlanCreation.module.scss';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import 'moment/locale/ru';
import Autocomplete from 'react-autocomplete';
import  MomentLocaleUtils, { formatDate, parseDate }  from 'react-day-picker/moment';

const PlanCreation=(props)=>{
    const [range,setRange] = useState({});
    const [workerName, setWorkerName] = useState("");
    const [superName, setSuperName] = useState("");
    const [workerPosition, setWorkerPosition] = useState("");
    const createNewPlan = (worker_id, position_id, super_id, date_start, date_end) => {
        props.createPlan(worker_id, position_id, super_id, props.user_id, date_start, date_end, 0, null, '');
        props.setIsCreationOpen(false);
    }
    const findID = (value,list) => {
       return list.filter(item=> item.name===value)[0].id;
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
                                inputProps={{placeholder:'Имя сотрудника' }}
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
                                inputProps={{placeholder:'Должность сотрудника' }}
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
                                inputProps={{placeholder:'Имя руководителя' }}
                                onChange={(e)=> setSuperName(e.target.value)}
                                onSelect={(val)=> setSuperName(val)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><div className={style.fieldName}> Период:</div></td>
                        <td>
                            <DayPickerInput 
                                component={props =><input className={style.periodInput}  {...props}/>}
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
                    <button className={style.addBtn}
                     onClick={()=> createNewPlan( findID(workerName, props.workers), 
                     findID(workerPosition, props.positions),
                     findID(superName, props.supers),
                     moment(range.from).format("DD.MM.YYYY"),
                     moment(range.to).format("DD.MM.YYYY"))}>Создать</button>
                </div>
            </div>
        </div>
    )
}

export default PlanCreation;