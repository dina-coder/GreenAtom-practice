import { MainAPI } from '../../API.js'
import { stopSubmit } from 'redux-form'
let initialState = {
    name: null,
    user_id: null,
    role_id: null,
    isAuth: false,
    isFetching:false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER: {
            return { ...state, ...action.payload }
        }
        case SET_LOGIN_OUT: {
            return { ...state, name: null, user_id: null, role_id: null, isAuth: false }

        }
        case TOGGLE_FETCHING:{
            return{...state,isFetching:action.isFetching}
        }


        default:
            return state
    }
}
export default AuthReducer

const SET_AUTH_USER = 'SET_AUTH_USER'
const SET_LOGIN_OUT = 'SET_LOGIN_OUT'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'

export const setToggle = (isFetching) => {
    return ({type:TOGGLE_FETCHING,isFetching})
    }

export const SetAuthCreation = (name, user_id, role_id, isAuth) => {
    return ({ type: SET_AUTH_USER, payload: { name, user_id, role_id, isAuth } });
}
export const SetLogOut = () => {
    return ({ type: SET_LOGIN_OUT })
}

export const login = (email, password) =>
    async (dispatch) => {
        let response = await MainAPI.login(email, password);
        if (response.empty === true) {
            let message = 'Неверный логин или пароль'
            dispatch(stopSubmit('login', { _error: message }))
        } else {
            console.log(response)
            dispatch(SetAuthCreation(response.name, response.user_id, response.role_id, true))
        }
    }




