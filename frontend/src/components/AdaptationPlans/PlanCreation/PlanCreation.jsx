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
                                    [
                                        {label: 'person'},
                                        {label: 'buk'},
                                        {label: 'duck'},
                                        {label: 'olly'},
                                    ]
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
                                    [
                                    ]
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
                                    [
                                        {label: 'ddd'},
                                        {label: 'aaaa'},
                                        {label: 'eds'},
                                        {label: 'saf'},
                                    ]
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
                    <button className={style.addBtn}>Создать</button>
                </div>
            </div>
        </div>
    )
}

export default PlanCreation;