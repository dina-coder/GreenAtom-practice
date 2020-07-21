export const isAdaptationPlanEnable = (role_id,step) =>{
    if ((role_id === 2 && (step === 'Согласование руководителем' || step === 'Оценка руководителем')) || 
     (role_id === 1) && step !== 'Оценка завершена'){
         return true
     }
     else return false
}


export const isButtonAddEnable = (role_id,step) => {

    if ((role_id === 1 && step !== 'Оценка завершена') ||
    (role_id === 2 && step === 'Согласование руководителем') ||  
    (role_id === 3 && step === 'Заполнение сотрудником'))
    {
        return true;
    } 
    else return false;
}  
export const isTaskDone = (role_id,step) => {
    if ((role_id === 1 && step !== 'Оценка завершена') ||
    (role_id === 2 && step === 'Оценка руководителем') ||  
    (role_id === 3 && step === 'Заполнение сотрудником'))
    {
        return true;
    } 
    else return false;
}