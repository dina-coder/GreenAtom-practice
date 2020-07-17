import { MainAPI } from '../API.js'
import { stopSubmit } from 'redux-form'
let initialState = {
    name: null,
    user_id: null,
    role_id: null,
    isAuth: false,
    profile: [],
    employee_info: [],
    plantasks:[]
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER: {
            return { ...state, ...action.payload }
        }
        case SET_LOGIN_OUT: {
            return { ...state, name: null, user_id: null, role_id: null, isAuth: false }

        }
        case TAKE_PROFILE_INFO: {
            console.log(action.profile)
            return { ...state, profile: action.profile }
        }
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
export default AuthReducer

const SET_AUTH_USER = 'SET_AUTH_USER'
const SET_LOGIN_OUT = 'SET_LOGIN_OUT'
const TAKE_PROFILE_INFO = 'TAKE_PROFILE_INFO'
const TAKE_EMPLOYEE_PROFILE_INFO='TAKE_EMPLOYEE_PROFILE_INFO';
const TAKE_TASKS_FOR_PLAN = 'TAKE_TASKS_FOR_PLAN'

export const SetAuthCreation = (name, user_id, role_id, isAuth) => {
    return ({ type: SET_AUTH_USER, payload: { name, user_id, role_id, isAuth } });
}
export const SetLogOut = () => {
    return ({ type: SET_LOGIN_OUT })
}

export const SetProfileInfo = (profile) => {
    return ({ type: TAKE_PROFILE_INFO, profile })
}

export const SetPlanTasks = (plantasks) => {
    return ({type: TAKE_TASKS_FOR_PLAN, plantasks})
}

export const SetEmployeeProfileInfo = (employee_info) => {
    return ({ type: TAKE_EMPLOYEE_PROFILE_INFO, employee_info })
}



export const TakeInfo = (user_id) => async (dispatch) => {
    let response = await MainAPI.takeData(user_id)
    console.log(response)
    dispatch(SetProfileInfo(response))
}

export const TakeTasks = (plan_id) => async (dispatch) => {
    let response = await MainAPI.taketask(plan_id)
    console.log(response)
    dispatch(SetPlanTasks(response))
}

export const GetEmployeeProfileInfo = (user_id) => async (dispatch) => {
    let response = await MainAPI.getemployeeinfo(user_id)
    dispatch(SetEmployeeProfileInfo(response))
    dispatch(TakeTasks(response[0].plan_id))
}



export const login = (email, password) =>
    async (dispatch) => {
        let response = await MainAPI.login(email, password);
        if (response.empty === true) {
            let message = 'Неверный логин или пароль'
            dispatch(stopSubmit('login', { _error: message }))
        }

        else {
            dispatch(SetAuthCreation(response.name, response.user_id, response.role_id, true))
            if (response.role_id !== 3) {
                dispatch(TakeInfo(response.user_id))
            }
            else dispatch(GetEmployeeProfileInfo(response.user_id))
        }
    }




