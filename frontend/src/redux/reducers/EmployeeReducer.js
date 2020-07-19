import { MainAPI } from '../../API.js'
let initialState = {
    employee_info: [],
    plantasks:[]
}

const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TAKE_EMPLOYEE_PROFILE_INFO: {
           
            return { ...state, employee_info: action.employee_info[0] }
        }
        case TAKE_TASKS_FOR_PLAN: {
           
            return { ...state, plantasks: action.plantasks }
        }
        default:
            return state
    }
}
export default EmployeeReducer


const TAKE_EMPLOYEE_PROFILE_INFO='TAKE_EMPLOYEE_PROFILE_INFO';
const TAKE_TASKS_FOR_PLAN = 'TAKE_TASKS_FOR_PLAN'


export const SetPlanTasks = (plantasks) => {
    return ({type: TAKE_TASKS_FOR_PLAN, plantasks})
}

export const SetEmployeeProfileInfo = (employee_info) => {
    return ({ type: TAKE_EMPLOYEE_PROFILE_INFO, employee_info })
}




export const TakeTasks = (plan_id) => async (dispatch) => {
    let response = await MainAPI.taketask(plan_id)
    dispatch(SetPlanTasks(response))
}

export const GetEmployeeProfileInfo = (user_id) => async (dispatch) => {
    let response = await MainAPI.getemployeeinfo(user_id)
    dispatch(SetEmployeeProfileInfo(response))
    dispatch(TakeTasks(response[0].plan_id))
}



