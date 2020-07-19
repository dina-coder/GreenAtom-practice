import { MainAPI } from '../../API.js'
import moment from 'moment';
import { act } from 'react-dom/test-utils'
let initialState = {
    plansList: [],
    filters: {
        search:"",
        step:"",
        period:""
    },
    filteredList: []
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

const HrReducer = (state = initialState, action) => {
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
        
        default:
            return state
    }
}

export default HrReducer

const SET_PLANS_LIST='SET_PLANS_LIST';
const FILTER ='FILTER';

export const SetHrPlanInfo = (plansList) => {
    return ({ type: SET_PLANS_LIST, plansList })
}

export const TakeHRPlan = () => async (dispatch) => {
    let response = await MainAPI.takeplan_HR()
    console.log(response)
    dispatch(SetHrPlanInfo(response))
}


