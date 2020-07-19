import React from 'react'
import AdaptationPlanInfo from './AdaptationPlanInfo/AdaptationPlanInfo'
import s from './AdaptationPlan.module.scss'
import PlanTasks from './PlanTasks/PlanTasks'


const AdaptationPlanForm = (props) => {
    return (
        <div>
            <div className={s.wrapper}>
                <AdaptationPlanInfo employee={props.employee} />
                <PlanTasks DeleteTaskFromEmployee={props.DeleteTaskFromEmployee} plantasks={props.plantasks}/>
            </div>
        </div>
    )
}

export default AdaptationPlanForm