import { MainAPI, createPdfFile, getPdf } from '../../API.js'
import {setToggle} from './AuthReducer'
import { saveAs } from 'file-saver';

let initialState = {
    employee_info: [],
    plantasks:[],
    user_id_for_superhr:null,
    amountOfTask: null,
    comments: [],
    amountOfComments: null
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
        case TAKE_AMOUNT_OF_TASKS: {
            return {...state, amountOfTask:action.amountOfTask}
        }
        case LOG_OUT: {
            return {...state, employee_info:null,plantasks:null }
        }
        case TAKE_COMMENTS: {
            return {...state, comments: action.comments}
        }
        case TAKE_AMOUNT_OF_COMMENTS:{
            return {...state, amountOfComments: action.amountOfComments}
        }
        
        default:
            return state
    }
}
export default EmployeeReducer


const LOG_OUT = 'LOG_OUT';
const TAKE_EMPLOYEE_PROFILE_INFO='TAKE_EMPLOYEE_PROFILE_INFO';
const TAKE_TASKS_FOR_PLAN = 'TAKE_TASKS_FOR_PLAN';
const TAKE_INFO_ABOUT_PLAN = 'TAKE_INFO_ABOUT_PLAN';
const TAKE_AMOUNT_OF_TASKS='TAKE_AMOUNT_OF_TASKS';
const TAKE_COMMENTS='TAKE_COMMENTS';
const TAKE_AMOUNT_OF_COMMENTS='TAKE_AMOUNT_OF_COMMENTS'

export const LogOut = () => {
    return ({type:LOG_OUT})
} 
export const SetPlanTasks = (plantasks) => {
    return ({type: TAKE_TASKS_FOR_PLAN, plantasks})
}

export const SetEmployeeProfileInfo = (employee_info) => {
    return ({ type: TAKE_EMPLOYEE_PROFILE_INFO, employee_info })
}

export const SetInfoForPlan = (user_id_for_superhr) => {
    return ({ type: TAKE_INFO_ABOUT_PLAN, user_id_for_superhr })
}

export const SetAmountOfTasks = (amountOfTask) =>{
    return ({type:TAKE_AMOUNT_OF_TASKS, amountOfTask})
}

export const SetComments = (comments) =>{
    return ({type:TAKE_COMMENTS, comments})
}

export const SetAmountOfComments = (amountOfComments) =>{
    return ({type:TAKE_AMOUNT_OF_COMMENTS, amountOfComments})
}



export const TakeTasks = (plan_id, currentPage) => async (dispatch) => {
    dispatch(setToggle(true))
    let response = await MainAPI.taketask(plan_id, currentPage)
    dispatch(setToggle(false))
    dispatch(SetPlanTasks(response))

}

export const GetEmployeeProfileInfo = (user_id, currPage) => async (dispatch) => {
    dispatch(setToggle(true))
    let response = await MainAPI.getemployeeinfo(user_id)
    console.log('resp',response);
    dispatch(setToggle(false))
    if (response[0] !== undefined ){
        dispatch(GetTaskAmount(response[0].plan_id))
        dispatch(GetCommentsAmount(response[0].plan_id))
        dispatch(SetEmployeeProfileInfo(response))
        dispatch(TakeTasks(response[0].plan_id, currPage))
        dispatch(GetComments(response[0].plan_id))
       
    }
    }


export const DeleteTaskFromEmployee = (task_id) => async () => {
     await MainAPI.deleteTask(task_id)
}

export const UpdateTaskStatusFromEmployee = (task_id, result) => async () => {
   let response = await MainAPI.updateTaskStatus(task_id, result)
}
export const UpdateTaskFromEmployee = (plan_id, name, content, date_start, date_end, result, id) => async () => {
    let response = await MainAPI.updateTask(plan_id, name, content, date_start, date_end, result, id)
 }
 export const CreatTaskForEmployee = (plan_id, name, content, date_start, date_end, result) => async () => {
    let response = await MainAPI.creactTasks(plan_id, name, content, date_start, date_end, result)
 }


 export const GetTaskAmount = (plan_id) => async (dispatch) => {
    let response = await MainAPI.getAmountOfTasks(plan_id)
    dispatch(SetAmountOfTasks(response.count))

}
export const GetCommentsAmount = (plan_id) => async (dispatch) => {
    let response = await MainAPI.getAmountOfComments(plan_id)
    dispatch(SetAmountOfComments(response.count))
    console.log(response)

}

export const GetComments = (plan_id, currentPage) => async (dispatch) => {
    let response = await MainAPI.getcomments(plan_id, currentPage)
    dispatch(SetComments(response));


}

export const PostComment = (content, plan_id, user_id) => async () => {
    await MainAPI.postComment(content, plan_id, user_id);
 }

 export const CreatePdf = (user_id) => async (dispatch) => {
    let response = await createPdfFile(user_id)
    console.log(response);
    dispatch(GetPdf(response.name))

}
export const GetPdf = (name) => async () => {
    let response = await getPdf(name)
    console.log(response)
    let  blob  = new Blob ( [response] , { type: 'application/pdf' } ) ; 
    saveAs(blob, name)
}