import { MainAPI } from '../../API.js';
import {setToggle} from './AuthReducer';
import { Roles } from '../../constants/roles';

let initialState = {
    plansList: [],
    filters: {
        search:"",
        step:"",
        period:""
    },
    filteredList: [],
    stepList:[]
}

const peopleFilter = (item, search) => {
    if (!search) return true;
    const nameHasSearch = !~item.name.indexOf(search);
    const superNameHasSearch = !~item.super.indexOf(search);
    if (nameHasSearch || superNameHasSearch) return true;
    return false;
}

const stepFilter = (item,search) => {
    if (!search) return true;
    const stepHasSearch = !~item.step.indexOf(search);
}

const periodFilter = (item,search) => {
    if (!search) return true;
    const period = search.split("-"); 
     if (
         (new Date(item.dateStart)) >= (new Date (period[0])) 
        && (new Date(item.dateEnd)) <= (new Date (period[1]))
        ) 
    return true;
    else return false;
    
}

const PlansReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLANS_LIST: {
            return { ...state, plansList: action.plansList }
        }
        case FILTER: {
            const { search, step, period } = action.filters;
            const filteredList = [...state.plansList]
                .filter(item => peopleFilter(item,search))
                .filter(item => stepFilter(item, step))
                .filter(item => periodFilter(item,period))
            return {...state, filters:action.filters, filteredList}
        }
        case STEPS: {
            return {...state, stepList: action.stepList}
        }
        default:
            return state
    }
}

export default PlansReducer;

const SET_PLANS_LIST='SET_PLANS_LIST';
const FILTER = 'FILTER';
const STEPS = 'STEPS';

export const setPlansList = (plansList) => {
    return ({ type: SET_PLANS_LIST, plansList })
}
export const setSteps = (stepList) => {
    return ({ type:STEPS, stepList})
}

export const setFilter = (filters) => {
    return ({type:FILTER, filters});
}

export const takePlans = (role,userId) => async (dispatch) => {
    let response; 
    dispatch (setToggle(true))
    if (role===Roles.HR) response = await MainAPI.takeplan_HR()
    if (role===Roles.Director) response = await MainAPI.takeData(userId)
    console.log(role, response);
    dispatch (setToggle(false))
    dispatch(setPlansList(response))
}

export const takeSteps = () => async(dispatch) => {
    let response = await MainAPI.takeSteps();
    dispatch(setSteps(response));
}

