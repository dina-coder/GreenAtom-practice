import React, { useState, useEffect } from 'react'
import s from './Task.module.scss'
import editionicon from '../../../../img/edit 2.png'
import deleteicon from '../../../../img/bin 1.png'
import downarrow from '../../../../img/down-arrow-green.png'
import checkmark from '../../../../img/checkmark.png'
import { isButtonAddEnable, isTaskDone } from '../../../../utils/isButtonAccess'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import 'moment/locale/ru';
import  MomentLocaleUtils, { formatDate, parseDate }  from 'react-day-picker/moment';


const Task = (props) =>{
    const [isFullInfo,setFullInfo] = useState(null)
    const [name,updateTaskName] = useState(props.name)
    const [description, updateTaskDescription]= useState(props.content)
    const [istaskEdited,updateTaskInfo] = useState(false)
    const [date, setDate] = useState(props.date_end)

    const EditModeShow = (key) =>{
        updateTaskInfo(true);
        setFullInfo(key)
    }
    const SetTaskName = (e) =>{
        updateTaskName(e.currentTarget.value)
    }
    const  ChangeTaskDate = (value) => {
        setDate(moment(value).format("DD.MM.YYYY"))
    }

    const UpdateTask = (plan_id, name, description, date_start, date, result, id) => {
        UpdateTaskFromEmployee(plan_id, name, description, date_start, date, result, id)
        updateTaskInfo(false)
    }

    const SetTaskDescription = (e) =>{
        updateTaskDescription(e.currentTarget.value)
        }


    const DeleteTaskFunction = (id, plan_id) =>{
        props.DeleteTaskFromEmployee(id)
        props.TakeTasks(plan_id)
    } 

    const UpdateTaskStatusFromEmployee=(id, result, plan_id)=>{
        props.UpdateTaskStatusFromEmployee(id, result)
        props.TakeTasks(plan_id)
    }
    
    const UpdateTaskFromEmployee=(plan_id, name, content, date_start, date_end, result, id)=>{
        props.UpdateTaskFromEmployee(plan_id, name, content, date_start, date_end, result, id)
        props.TakeTasks(plan_id)
    }
    return (
        <div className={isFullInfo === props.key ? s.ContainerBig : s.Container}>
           { isTaskDone(props.role_id,props.step) ?
           props.result === 0 ?
            <div onClick={()=>{UpdateTaskStatusFromEmployee(props.id, 1, props.plan_id)}} className= {s.CircleFalse} ></div>:
            <div onClick={()=>{UpdateTaskStatusFromEmployee(props.id, 0, props.plan_id)}} className={s.CircleTrue}></div>:
            props.result === 0 ?
            <div className= {s.CircleFalse} ></div>:
            <div className={s.CircleTrue}></div>}
            {istaskEdited==false ? <h3 className={s.Title1}>{props.name}</h3> :<input value = {name} onChange ={SetTaskName} className ={s.Title}/>} 
            {istaskEdited==false ? <h3 className={s.Date1}>До {props.date_end}</h3> : 
            <div className={s.Date1}>
            <DayPickerInput 
            component = {props =><input className={s.Date} {...props}/>}
            placeholder = "Период"
            formatDate = {formatDate}
            parseDate = {parseDate}
            value = {props.date_end}
            dayPickerProps = {{
                localeUtils:MomentLocaleUtils,
                locale:"ru",
                onDayClick: (value) => {
                    ChangeTaskDate(value)}
                }}  
        /></div>}
            {isButtonAddEnable(props.role_id,props.step) ?
             <img onClick={()=>EditModeShow(props.key)} className={s.Edit} src={editionicon} />:
             ''
            }
           
            {isButtonAddEnable(props.role_id, props.step) ?
            <img onClick={()=>DeleteTaskFunction(props.id,props.plan_id)} className={s.Delete} src={deleteicon} /> :
            ''
            }
            {isFullInfo === props.key ?  
             <img className={s.downarrowTransofm} onClick={()=>{setFullInfo(-1)}} src={downarrow} /> :
            <img className={s.downarrow} onClick={()=>{setFullInfo(props.key)}} src={downarrow} />
             }
           
            {isFullInfo === props.key ? <div className={s.Description}>
            {istaskEdited==false ? <p className={s.DescriptionText}>{props.content}</p> : 
            <div><textarea value = {description} onChange ={SetTaskDescription} className ={s.DescriptionText}/> 
            <img onClick={()=>UpdateTask(props.plan_id, name, description, props.date_start, date, props.result, props.id)} className={s.CheckMark} src={checkmark} /> </div>}
            </div>:''}
        </div>
    )
}

export default Task