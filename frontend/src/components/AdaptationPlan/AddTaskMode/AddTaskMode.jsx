import React, { useState } from 'react'
import s from './AddTaskMode.module.scss'

const AddTaskMode = (props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const ChangeTaskName = (e) => {
        setName(e.currentTarget.value)
    }

    const ChangeTaskDescription = (e) => {
        setDescription(e.currentTarget.value)
    }

    const SendNewDataForPlan = (plan_id,name, content, date_start, date_end, result) => {
        props.CreatTaskForEmployee(plan_id,name, content, date_start, date_end, result)
        props.TakeTasks(plan_id)
    }
    let now = new Date();
    let CurrentData = now.getDate() + '.0'+now.getMonth() + '.' +now.getFullYear()
    return (
    <div className = {s.constainer}>
        <div onClick = {()=>props.SetTaskButton(false)} className = {s.close}></div>
        <table>
        <tr>
            <td><div> Имя сотрудника:</div></td>
            <td><div>{props.userName}</div></td>
        </tr>
        <tr>
            <td><div> Дата начала:</div></td>
            <td><div> {CurrentData}</div></td>
        </tr>
        <tr>
            <td><div> Дата окончания:</div></td>
            <td><div><input value = {props.date_end}/></div></td>
        </tr>
        <tr>
            <td><div> Название задачи </div></td>
            <td><div> <input onChange = {ChangeTaskName} value = {name} placeholder = {'Назавание задачи'}/></div></td>
        </tr>
        <tr>
            <td><div> Описание </div></td>
            <td><div> <input onChange = {ChangeTaskDescription} value = {description} placeholder = {'Описание задачи'}/></div></td>
        </tr>
        </table>
        <button onClick = {() => SendNewDataForPlan(props.plan_id,name, description,CurrentData, props.date_end, 0)}>Добавить</button>

    </div>)
}

export default AddTaskMode