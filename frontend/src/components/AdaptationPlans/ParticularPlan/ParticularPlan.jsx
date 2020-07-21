import React from 'react'
import s from './ParticularPlan.module.scss'
import AdaptationPlanInfo from '../../AdaptationPlan/AdaptationPlanInfo/AdaptationPlanInfo'
import PlanTasks from '../../AdaptationPlan/PlanTasks/PlanTasks'

const ParticularPlan = (props) =>{
    console.log(props.isPlanClick)
    return (  
            <div className = {s.container}>
                <div className = {s.close} onClick = {()=>props.setPlanClick(false)}></div>
          <AdaptationPlanInfo employee = {props.employee}/>
          <PlanTasks CreatTaskForEmployee = {props.CreatTaskForEmployee}
                date_end = {props.employee.date_end}
                userName = {props.employee.name}
                DeleteTaskFromEmployee={props.DeleteTaskFromEmployee} 
                plantasks={props.plantasks} TakeTasks={props.TakeTasks} 
                plan_id={props.employee.plan_id}
                UpdateTaskStatusFromEmployee={props.UpdateTaskStatusFromEmployee}
                UpdateTaskFromEmployee={props.UpdateTaskFromEmployee}/>
            </div>
    )
}
export default ParticularPlan