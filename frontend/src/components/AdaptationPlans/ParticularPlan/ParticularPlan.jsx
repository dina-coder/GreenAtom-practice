import React from 'react'
import s from './ParticularPlan.module.scss'
import AdaptationPlanInfo from '../../AdaptationPlan/AdaptationPlanInfo/AdaptationPlanInfo'
import PlanTasks from '../../AdaptationPlan/PlanTasks/PlanTasks'

const ParticularPlan = (props) =>{
    return (  
            <div className ={s.container}>
          <AdaptationPlanInfo employee = {props.employee}/>
          <PlanTasks plantasks={props.plantasks}/>
            </div>
    )
}
export default ParticularPlan