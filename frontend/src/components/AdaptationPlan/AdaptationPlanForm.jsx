import React from 'react'
import AdaptationPlanInfo from './AdaptationPlanInfo/AdaptationPlanInfo'
import s from './AdaptationPlan.module.scss'
import PlanTasks from './PlanTasks/PlanTasks'
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import { Roles } from '../../constants/roles'
import StepTracker from './StepTracker/StepTracker';
import Comments from './Comments/Comments';
import Preloader from "../Preloader/Preloader";


const AdaptationPlanForm = (props) => {
    const RerenderPlans = (user_id, role_id) =>{
        props.setPlanClick(false);
        props.takePlans(mapRoleIdToRole(role_id), props.filters, user_id,props.page, props.sort);
    }
    return (
        <div className={mapRoleIdToRole(props.role_id) === Roles.Employee ? s.wrapper : s.container}>
            {props.employee !== null ?
            <div>
             {(mapRoleIdToRole(props.role_id) !== Roles.Employee) &&
             <div className={s.close}
                  onClick={() => RerenderPlans(props.user_id, props.role_id)}>
             </div>}
              <div  className={s.planContainer}>
            <StepTracker step={props.employee.step_id}/>
            <AdaptationPlanInfo
                key={props.worker_id}
                worker_id = {props.worker_id}
                user_id = {props.user_id}
                CreatePdf = {props.CreatePdf}
                positions = {props.dict.positions}
                stepList = {props.dict.stepList}
                supersNames ={props.dict.supersNames}
                role_id = {props.role_id}
                employee = {props.employee}
                updatePlan = {props.updatePlan}
                GetEmployeeProfileInfo = {props.GetEmployeeProfileInfo}
                hrNames = {props.dict.hrNames}
                grades = {props.dict.grades}
            />
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
                {props.isFetching === true&&<Preloader/>}
                 </div>
            </div>
            : <h1 className={s.ErrorPlans}>Нет плана</h1>}

        </div>
    )
}

export default AdaptationPlanForm