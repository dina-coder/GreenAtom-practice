import React, { useEffect } from 'react'
import AdaptationPlanInfo from './AdaptationPlanInfo/AdaptationPlanInfo'
import s from './AdaptationPlan.module.scss'
import PlanTasks from './PlanTasks/PlanTasks'
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import { Roles } from '../../constants/roles'


const AdaptationPlanForm = (props) => {
    const RerenderPlans = (user_id, role_id) =>{
        props.setPlanClick(false);
        if (role_id===1){
            props.takePlans('HR');
        }
        else props.takePlans('Director', user_id);

    }

    return (
        <div className={mapRoleIdToRole(props.role_id) === Roles.Employee ? s.wrapper : s.container}>
            { (mapRoleIdToRole(props.role_id) !== Roles.Employee)&&
             <div className={s.close} onClick={() => RerenderPlans(props.user_id, props.role_id)}></div>}
           
            <AdaptationPlanInfo 
                                positions = {props.positions}
                                stepList = {props.stepList}
                                supersNames ={props.supersNames}
                                role_id = {props.role_id} employee = {props.employee}
                                updatePlan = {props.updatePlan}
                                GetEmployeeProfileInfo = {props.GetEmployeeProfileInfo}
                                hrNames = {props.hrNames} 
                                grades = {props.grades}/>
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
                amountOfTask={props.amountOfTask}
                TakeTasks={props.TakeTasks}
                 />
        </div>
    )
}

export default AdaptationPlanForm