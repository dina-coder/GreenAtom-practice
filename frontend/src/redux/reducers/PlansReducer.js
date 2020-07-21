import { MainAPI } from '../../API.js';
import {setToggle} from './AuthReducer';
import { Roles } from '../../constants/roles';

let initialState = {
    plansList: [],
    filters: {
        search:null,
        step:null,
        period:null
    },
    filteredList: [],
    stepList:[]
}

const formatDate = (date)=>{
  return  +new Date(date.split('.').reverse().join('.'));
}


const peopleFilter = (item, search) => {
    if (!search) return true;
    const nameHasSearch = (item.name.toLowerCase().indexOf(search.toLowerCase())!==-1);
    const superNameHasSearch = (item.super.toLowerCase().indexOf(search.toLowerCase())!==-1);
    console.log(nameHasSearch);
    if (nameHasSearch || superNameHasSearch) return true;
    return false;
}

const stepFilter = (item,search) => {
    if (!search) return true;
    const stepHasSearch = item.step.indexOf(search)!==-1;
    if (stepHasSearch) return true;
    return false;
}

const periodFilter = (item,search) => {
    if (!search) return true;
    const period = search.split("-"); 
     if (
         (formatDate(item['date_start'])) >= (formatDate(period[0])) 
        && (formatDate(item['date_end'])) <= (formatDate(period[1]))
        ) {
            console.log("imhere");
         return true; }
    else return false;
    
}

const PlansReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLANS_LIST: {
            return { ...state, plansList: action.plansList }
        }
        case FILTER: {
            const { search, step, period } = action.filters;
            console.log(action.filters);
            const filteredList = [...state.plansList]
                .filter(item => peopleFilter(item,search))
                .filter(item => stepFilter(item, step))
                .filter(item => periodFilter(item,period))
                console.log(filteredList)
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
    dispatch (setToggle(false))
    dispatch(setPlansList(response))
}

export const takeSteps = () => async(dispatch) => {
    let response = await MainAPI.takeSteps();
    dispatch(setSteps(response));
}

