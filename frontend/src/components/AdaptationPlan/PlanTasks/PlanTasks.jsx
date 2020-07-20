import React, { useState } from 'react'
import s from './PlanTasks.module.scss'
import Task from './Task/Task'
import AddTaskMode from '../AddTaskMode/AddTaskMode'

const PlanTasks = (props) =>{
    const [AddTaskButton,SetTaskButton] = useState(false)
    let AllTasks;
    if (props.plantasks.length>0)
    {
        AllTasks=props.plantasks.map((x, key)=><Task plan_id={props.plan_id} id = {x.id}
                                                    date_start={x.date_start}
                                                    DeleteTaskFromEmployee = {props.DeleteTaskFromEmployee} 
                                                    key={key} name={x.name} 
                                                    date_end={x.date_end} result={x.result} 
                                                    content={x.content} plan_id={props.plan_id} 
                                                    TakeTasks={props.TakeTasks}
                                                    UpdateTaskStatusFromEmployee={props.UpdateTaskStatusFromEmployee}
                                                    UpdateTaskFromEmployee={props.UpdateTaskFromEmployee}/>)
    }
    else AllTasks="Задачи не добавлены"
    return (
        <div className={s.Container}>
        <h1> Задачи ({props.plantasks.length>0?props.plantasks.length: 0}) </h1>
        <div className={s.ButtonContainer}>
        <button onClick = {() => SetTaskButton(true)} className={s.addButton}>+Добавить задачу</button>
        </div>
            {AllTasks}
            {AddTaskButton === true ?
            <div><AddTaskMode plan_id = {props.plan_id}/></div>:
            ''
            }
            
        </div>
    )
}

export default PlanTasks