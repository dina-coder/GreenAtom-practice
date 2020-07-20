import React, { useState } from 'react'
import s from './PlanTasks.module.scss'
import TopPanelWithCreate from '../../TopPanelWithCreate/TopPanelWithCreate'
import Task from './Task/Task'

const PlanTasks = (props) =>{
    let AllTasks;
    if (props.plantasks.length>0)
    {
        AllTasks=props.plantasks.map((x, key)=><Task plan_id={props.plan_id} id = {x.id}
                                                    DeleteTaskFromEmployee = {props.DeleteTaskFromEmployee} 
                                                    key={key} name={x.name} 
                                                    date_end={x.date_end} result={x.result} 
                                                    content={x.content} plan_id={props.plan_id} 
                                                    TakeTasks={props.TakeTasks}
                                                    UpdateTaskStatusFromEmployee={props.UpdateTaskStatusFromEmployee}/>)
    }
    else AllTasks="Задачи не добавлены"
    return (
        <div className={s.Container}>
        <h1> Задачи ({props.plantasks.length>0?props.plantasks.length: 0}) </h1>
        <div className={s.ButtonContainer}>
        <button className={s.addButton}>+Добавить задачу</button>
        </div>
            {AllTasks}
        </div>
    )
}

export default PlanTasks