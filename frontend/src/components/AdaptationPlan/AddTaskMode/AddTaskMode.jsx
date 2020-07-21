import React, { useState } from 'react'
import s from './AddTaskMode.module.scss'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import 'moment/locale/ru';
import  MomentLocaleUtils, { formatDate, parseDate }  from 'react-day-picker/moment';

const AddTaskMode = (props) => {
    const [range,setRange] = useState({});
    const [date, setDate] = useState(moment(range.from).format("DD.MM.YYYY"))
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const ChangeTaskName = (e) => {
        setName(e.currentTarget.value)
    }
    const  ChangeTaskDate = (value) => {
        console.log(moment(value).format("DD.MM.YYYY"))
        setDate(moment(value).format("DD.MM.YYYY"))
    }
    const ChangeTaskDescription = (e) => {
        setDescription(e.currentTarget.value)
    }
    
    const PushNewTask = (plan_id,name,description,CurrentData, date, result) => {
        SendNewDataForPlan(plan_id,name, description,CurrentData, date, result)
        props.SetTaskButton(false)
    }
        
    

    const SendNewDataForPlan = (plan_id,name, content, date_start, date_end, result) => {
        props.CreatTaskForEmployee(plan_id,name, content, date_start, date_end, result)
        props.TakeTasks(plan_id)
    }
    let now = new Date();
    let CurrentData = now.getDate() + '.0'+now.getMonth() + '.' +now.getFullYear()
    return (
    <div className = {s.container}>
        <div onClick = {()=>props.SetTaskButton(false)} className = {s.close}></div>
        <h2 className={s.Title}>Добавить задачу</h2>
        <div className={s.Line} />
        <table className={s.AddTable}>
        <tr>
            <td><div className={s.NameOfField}> Имя сотрудника:</div></td>
            <td><div>{props.userName}</div></td>
        </tr>
        <tr>
            <td><div className={s.NameOfField}> Дата начала:</div></td>
            <td><div> {CurrentData}</div></td>
        </tr>
        <tr>
            <td><div className={s.NameOfField}> Дата окончания:</div></td>
            <td><DayPickerInput 
                    component = {props =><input className={s.Input} {...props}/>}
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
                /></td>
        </tr>
        <tr>
            <td><div className={s.NameOfField}> Название задачи: </div></td>
            <td><div> <input className={s.Input} onChange = {ChangeTaskName} value = {name} placeholder = {'Название задачи'}/></div></td>
        </tr>
        <tr>
            <td><div className={s.NameOfField}> Описание: </div></td>
            <td><div> <textarea className={s.InputBig} onChange = {ChangeTaskDescription} value = {description} placeholder = {'Описание задачи'}/></div></td>
        </tr>
        </table>
        <div className={s.ButtonContainer}>
        <button className={s.AddButton} onClick = {() => PushNewTask(props.plan_id,name, description,CurrentData, date, 0)}>Сохранить</button>
        </div>
    </div>)
}

export default AddTaskMode