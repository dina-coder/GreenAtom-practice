import { mapRoleIdToRole } from './mapRoleIdToRole';
import { Roles } from '../constants/roles';
import { Steps } from '../constants/steps';


const privileges = (role_id, step) => {
    const isHRPrivilege = (mapRoleIdToRole(role_id)=== Roles.HR && step !== Steps.AssessmentOver);
    const isDirectorPrivilege = (mapRoleIdToRole(role_id) === Roles.Director && step === Steps.Assessment);
    const isEmployeePrivilege = (mapRoleIdToRole(role_id) === Roles.Employee && step === Steps.EmployeeFilling);
    return isHRPrivilege || isEmployeePrivilege || isDirectorPrivilege;
}

export const isAdaptationPlanEnable = (role_id,step) =>{
    if ((mapRoleIdToRole(role_id) === Roles.Director)
    && (step === Steps.DirectorAgreement)
    || privileges(role_id, step)){
         return true
     }
     else return false
}


export const isButtonAddEnable = (role_id,step) => {
    if (privileges(role_id, step))
    {
        return true;
    } 
    else return false;
}  
export const isTaskDone = (role_id,step) => {
    if (privileges(role_id, step))
    {
        return true;
    } 
    else return false;
}