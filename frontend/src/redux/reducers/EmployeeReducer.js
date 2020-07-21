import { MainAPI } from '../../API.js'
import {setToggle} from './AuthReducer'

let initialState = {
    employee_info: [],
    plantasks:[],
    user_id_for_superhr:null,
}

const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TAKE_EMPLOYEE_PROFILE_INFO: {
           
            return { ...state, employee_info: action.employee_info[0] }
        }
        case TAKE_TASKS_FOR_PLAN: {
           
            return { ...state, plantasks: action.plantasks }
        }
        case TAKE_INFO_ABOUT_PLAN: {
            return { ...state, user_id_for_superhr: action.user_id_for_superhr }
        }
        
        default:
            return state
    }
}
export default EmployeeReducer


const TAKE_EMPLOYEE_PROFILE_INFO='TAKE_EMPLOYEE_PROFILE_INFO';
const TAKE_TASKS_FOR_PLAN = 'TAKE_TASKS_FOR_PLAN'
const TAKE_INFO_ABOUT_PLAN = 'TAKE_INFO_ABOUT_PLAN'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'

export const SetPlanTasks = (plantasks) => {
    return ({type: TAKE_TASKS_FOR_PLAN, plantasks})
}

export const SetEmployeeProfileInfo = (employee_info) => {
    return ({ type: TAKE_EMPLOYEE_PROFILE_INFO, employee_info })
}

export const SetInfoForPlan = (user_id_for_superhr) => {
    return ({ type: TAKE_INFO_ABOUT_PLAN, user_id_for_superhr })
}




export const TakeTasks = (plan_id) => async (dispatch) => {
    dispatch(setToggle(true))
    let response = await MainAPI.taketask(plan_id)
    dispatch(setToggle(false))
    dispatch(SetPlanTasks(response))

}

export const GetEmployeeProfileInfo = (user_id) => async (dispatch) => {
    dispatch(setToggle(true))
    let response = await MainAPI.getemployeeinfo(user_id)
    dispatch(setToggle(false))
    dispatch(SetEmployeeProfileInfo(response))
    dispatch(TakeTasks(response[0].plan_id))
}

export const DeleteTaskFromEmployee = (task_id) => async () => {
     await MainAPI.deleteTask(task_id)
}

export const UpdateTaskStatusFromEmployee = (task_id, result) => async () => {
   let response = await MainAPI.updateTaskStatus(task_id, result)
   console.log(response)
}
export const UpdateTaskFromEmployee = (plan_id, name, content, date_start, date_end, result, id) => async () => {
    let response = await MainAPI.updateTask(plan_id, name, content, date_start, date_end, result, id)
    console.log(response)
 }
 export const CreatTaskForEmployee = (plan_id, name, content, date_start, date_end, result) => async () => {
    let response = await MainAPI.creactTasks(plan_id, name, content, date_start, date_end, result)
    console.log(response)
 }


