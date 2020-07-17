import React, { useState } from 'react'
import s from './PlanTasks.module.scss'
import ListHeader from '../../ListHeader/ListHeader'
import Task from './Task/Task'

const PlanTasks = (props) =>{

    const AllTasks=props.plantasks.map((x, key)=><Task key={key} name={x.name} date_end={x.date_end} result={x.result} content={x.content}/>)
    return (
        <div className={s.Container}>
        <ListHeader title="Задачи" buttonTitle="задачу" amount="0" /> 
            {AllTasks}    
        </div>
    )
}

export default PlanTasks