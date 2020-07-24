import { MainAPI } from '../../API.js';
import { setToggle } from './AuthReducer';
import { Roles } from '../../constants/roles';

let initialState = {
    plansList: [],
    filters: {
        search: '',
        step: 0,
        period: ''
    },
    filteredList: [],
    amount: null
}

const PlansReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLANS_LIST: {
            return { ...state, plansList: action.plansList }
        }
        case FILTER: {
            return {...state, filters: action.filters}
        }
        case AMOUNT: {
            return {...state, amount: action.amount}
        }
        case LOG_OUT_SUPER: {
            return {...state,plansList:null, filteredList:null}
        }
        case SET_FILTERED_LIST: {
            return { ...state, filteredList: action.filteredList}
        }
        default:
            return state
    }
}

export default PlansReducer;

const SET_PLANS_LIST = 'SET_PLANS_LIST';
const FILTER = 'FILTER';
const AMOUNT = 'AMOUNT';
const LOG_OUT_SUPER = 'LOG_OUT_SUPER';
const SET_FILTERED_LIST = 'SET_FILTERED_LIST';


export const loginOutSuper = () => {
    return ({type:LOG_OUT_SUPER})
}
export const setPlansList = (plansList) => {
    return ({
        type: SET_PLANS_LIST,
        plansList
    })
}

export const setFilter = (filters) => {
    return ({type: FILTER, filters});
}

export const setFilteredList = (filteredList) => {
    return ({type:SET_FILTERED_LIST, filteredList});
}

export const setPlansAmount = (amount) => {
    return ({type: AMOUNT, amount});
}
export const takePlans = (role, userId,curPage) => async (dispatch) => {
    let response;
    dispatch(setToggle(true));
    if (role === Roles.HR) response = await MainAPI.takeplan_HR(curPage);
    if (role === Roles.Director) response = await MainAPI.takeData(userId,curPage);
    dispatch(setToggle(false));
    dispatch(setPlansList(response))
}

export const createPlan = (worker_id, position_id, super_id, hr_id, date_start, date_end, result, grade_id, comment) => async () => {
    const response = await MainAPI.createPlan(worker_id, position_id, super_id, hr_id, date_start, date_end, result, grade_id, comment);
    console.log(response);
}

export const updatePlan = (worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, comment, id) => async () => {
    let response = await MainAPI.updatePlanApi(worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, comment,id)
    console.log(response)
}

export const getPlansAmount = (id) => async(dispatch) => {
    const response = await MainAPI.getAmountOfPlans(id);
    dispatch(setPlansAmount(response.count));
}

export const getFilteredList = (role,filters,userId,page) => async(dispatch) => {
    dispatch(setToggle(true));
    console.log(role,filters,userId)
    const response = await MainAPI.getFilteredList(role,filters.step,filters.period,filters.search,userId,page);
    dispatch(setToggle(false));
    console.log(response);
    dispatch(setPlansAmount(response[0]));
    dispatch(setFilteredList(response[1]));
}