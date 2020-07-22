import { mapRoleIdToRole } from './mapRoleIdToRole';
import { Roles } from '../constants/roles';
import { Steps } from '../constants/steps';

export const isAdaptationPlanEnable = (role_id,step) =>{
    if ((mapRoleIdToRole(role_id) === Roles.HR && (step === Steps.DirectorAgreement || step === Steps.Assessment)) ||
    (mapRoleIdToRole(role_id) === Roles.HR && step !== Steps.AssessmentOver))
    {
         return true
     }
     else return false
}
export const isButtonAddEnable = (role_id,step) => {
    if ((mapRoleIdToRole(role_id) === Roles.HR && step !== Steps.AssessmentOver) ||
    (mapRoleIdToRole(role_id) === Roles.Director && step === Steps.DirectorAgreement) ||  
    (mapRoleIdToRole(role_id) === Roles.Employee && step === Steps.EmployeeFilling))
    {
        return true;
    } 
    else return false;
}  

export const isTaskDone = (role_id,step) => {
    if ((mapRoleIdToRole(role_id) === Roles.HR && step !== Steps.AssessmentOver) ||
    (mapRoleIdToRole(role_id) === Roles.Director && step === Steps.Assessment) ||  
    (mapRoleIdToRole(role_id) === Roles.Employee && step === Steps.EmployeeCompliting))
    {
        return true;
    } 
    else return false;
}
export const PostToNextStep = (role_id,step) => {
    if ( mapRoleIdToRole(role_id) === Roles.Employee && (step === Steps.EmployeeCompliting || step === Steps.EmployeeFilling))
    {
        return true;
    } 
    else return false;
}