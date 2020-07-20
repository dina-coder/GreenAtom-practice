import React, { useState } from 'react'
import AdaptationPlanInfo from './AdaptationPlanInfo/AdaptationPlanInfo'
import s from './AdaptationPlan.module.scss'
import PlanTasks from './PlanTasks/PlanTasks'


const AdaptationPlanForm = (props) => {
  
    return (
        <div>
            <div className={s.wrapper}>
                <AdaptationPlanInfo employee={props.employee} />
                <PlanTasks 
                CreatTaskForEmployee = {props.CreatTaskForEmployee}
                date_end = {props.employee.date_end}
                userName = {props.employee.name}
                DeleteTaskFromEmployee={props.DeleteTaskFromEmployee} 
                plantasks={props.plantasks} TakeTasks={props.TakeTasks} plan_id={props.employee.plan_id}
                 UpdateTaskStatusFromEmployee={props.UpdateTaskStatusFromEmployee}
                 UpdateTaskFromEmployee={props.UpdateTaskFromEmployee}/>
            </div>
        </div>
    )
}

export default AdaptationPlanForm