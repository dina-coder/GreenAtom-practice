import React, { useState } from 'react'
import s from './PlanTasks.module.scss'
import TopPanelWithCreate from '../../TopPanelWithCreate/TopPanelWithCreate'
import Task from './Task/Task'

const PlanTasks = (props) =>{

    const AllTasks=props.plantasks.map((x, key)=><Task key={key} name={x.name} date_end={x.date_end} result={x.result} content={x.content}/>)
    return (
        <div className={s.Container}>
        <TopPanelWithCreate title="Задачи" buttonTitle="задачу" amount="0" />
            {AllTasks}    
        </div>
    )
}

export default PlanTasks