import React, { useEffect } from 'react'
import AdaptationPlanInfo from './AdaptationPlanInfo/AdaptationPlanInfo'
import s from './AdaptationPlan.module.scss'
import PlanTasks from './PlanTasks/PlanTasks'
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import { Roles } from '../../constants/roles'
import StepTracker from './StepTracker/StepTracker';
import Comments from './Comments/Comments';


const AdaptationPlanForm = (props) => {
    const RerenderPlans = (user_id, role_id) =>{
        props.setPlanClick(false);
        props.takePlans(mapRoleIdToRole(role_id), props.filters, user_id)
    }
    return (
        <div className={mapRoleIdToRole(props.role_id) === Roles.Employee ? s.wrapper : s.container}>
            {props.employee !== null ?
           
            <div>
             {(mapRoleIdToRole(props.role_id) !== Roles.Employee) &&
             <div className={s.close} onClick={() => RerenderPlans(props.user_id, props.role_id)}></div>}
            <StepTracker step={props.employee.step_id}/>
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
                GetTaskAmount = {props.GetTaskAmount}
                role_id={props.role_id}
                step = {props.employee.step}
                CreatTaskForEmployee={props.CreatTaskForEmployee}
                date_end={props.employee.date_end}
                userName={props.employee.name}
                DeleteTaskFromEmployee={props.DeleteTaskFromEmployee}
                plantasks={props.plantasks} 
                TakeTasks={props.TakeTasks}
                plan_id={props.employee.plan_id}
                UpdateTaskStatusFromEmployee={props.UpdateTaskStatusFromEmployee}
                UpdateTaskFromEmployee={props.UpdateTaskFromEmployee}
                amountOfTask={props.amountOfTask}
                 />
            <Comments 
                GetComments={props.GetComments}
                PostComment={props.PostComment}
                plan_id={props.employee.plan_id}
                user_id={props.user_id}
                comments={props.comments}
                amountOfComments={props.amountOfComments}
                />
                 </div>
            : <h1 className={s.ErrorPlans}>Нет плана</h1>}
        </div>
    )
}

export default AdaptationPlanForm