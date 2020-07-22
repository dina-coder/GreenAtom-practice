import React from 'react'
import AdaptationPlanInfo from './AdaptationPlanInfo/AdaptationPlanInfo'
import s from './AdaptationPlan.module.scss'
import PlanTasks from './PlanTasks/PlanTasks'
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import { Roles } from '../../constants/roles'


const AdaptationPlanForm = (props) => {

    return (
        <div className={mapRoleIdToRole(props.role_id) === Roles.Employee ? s.wrapper : s.container}>
            { (mapRoleIdToRole(props.role_id) !== Roles.Employee)&&
             <div className={s.close} onClick={() => props.setPlanClick(false)}></div>}
           
            <AdaptationPlanInfo role_id={props.role_id} employee={props.employee}
                                updatePlan={props.updatePlan}
                                GetEmployeeProfileInfo={props.GetEmployeeProfileInfo} />
            <PlanTasks
                role_id={props.role_id}
                step = {props.employee.step}
                CreatTaskForEmployee={props.CreatTaskForEmployee}
                date_end={props.employee.date_end}
                userName={props.employee.name}
                DeleteTaskFromEmployee={props.DeleteTaskFromEmployee}
                plantasks={props.plantasks} TakeTasks={props.TakeTasks}
                plan_id={props.employee.plan_id}
                UpdateTaskStatusFromEmployee={props.UpdateTaskStatusFromEmployee}
                UpdateTaskFromEmployee={props.UpdateTaskFromEmployee}
                 />
        </div>
    )
}

export default AdaptationPlanForm