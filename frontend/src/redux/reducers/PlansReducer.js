import { MainAPI } from '../../API.js';
import { setToggle } from './AuthReducer';
import { Roles } from '../../constants/roles';
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import { formatDate } from '../../utils/formatDate';

let initialState = {
    plansList: [],
    filters: {
        search: null,
        step: null,
        period: null
    },
    filteredList: [],
    stepList: [],
    workersNames: [],
    supersNames: [],
    hrNames: [],
    positions: [],
    grades: [],
    amount: null
}

const peopleFilter = (item, search) => {
    if (!search) return true;
    const nameHasSearch = (item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    const superNameHasSearch = (item.super.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    if (nameHasSearch || superNameHasSearch) return true;
    return false;
}

const stepFilter = (item, search) => {
    if (!search) return true;
    const stepHasSearch = item.step.indexOf(search) !== -1;
    if (stepHasSearch) return true;
    return false;
}

const periodFilter = (item, search) => {
    if (!search) return true;
    const period = search.split("-");
    if (
        (formatDate(item['date_start'])) >= (formatDate(period[0])) &&
        (formatDate(item['date_end'])) <= (formatDate(period[1]))
    )
        return true;
    else return false;

}

const PlansReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLANS_LIST: {
            return {
                ...state,
                plansList: action.plansList
            }
        }
        case FILTER: {
            const {
                search,
                step,
                period
            } = action.filters;
            if(state.plansList.hasOwnProperty('empty')) return {...state} 
            const filteredList = [...state.plansList]
                .filter(item => peopleFilter(item, search))
                .filter(item => stepFilter(item, step))
                .filter(item => periodFilter(item, period))
            return {
                ...state,
                filters: action.filters,
                filteredList
            }
        }
        case STEPS: {
            return {...state, stepList: action.stepList}
        }
        case WORKERS_NAMES: {
           return {...state,  workersNames: action.nameList}
        }
        case SUPERS_NAMES: {
           return {...state,  supersNames: action.nameList}
        }
        case HR_NAMES: {
            return {...state, hrNames:action.nameList}
        }
        case GRADES: {
            return {...state, grades:action.grades}
        }
        case POSITIONS: {
            return {...state, positions: action.positions}
        }
        case AMOUNT: {
            return {...state, amount: action.amount.count}
        }
        case LOG_OUT_SUPER: {
            return {...state,plansList:null, filteredList:null }
        }
        default:
            return state
    }
}

export default PlansReducer;

const SET_PLANS_LIST = 'SET_PLANS_LIST';
const FILTER = 'FILTER';
const STEPS = 'STEPS';
const WORKERS_NAMES = 'WORKERS_NAMES';
const SUPERS_NAMES = 'SUPERS_NAMES';
const POSITIONS = 'POSITIONS';
const HR_NAMES = 'HR_NAMES';
const GRADES = 'GRADES';
const AMOUNT = 'AMOUNT';
const LOG_OUT_SUPER = 'LOG_OUT_SUPER'

export const loginOutSuper = () => {
    return ({type:LOG_OUT_SUPER})
}
export const setPlansList = (plansList) => {
    return ({
        type: SET_PLANS_LIST,
        plansList
    })
}
export const setSteps = (stepList) => {
    return ({
        type: STEPS,
        stepList
    })
}

export const setWorkersNames = (nameList) => {
    return ({
        type: WORKERS_NAMES,
        nameList
    })
}
export const setHrNames = (nameList) => {
    return ({
        type: HR_NAMES,
        nameList
    })
}
export const setSupersNames = (nameList) => {
    return({ type:SUPERS_NAMES, nameList})
}
export const takeGrades = (grades) => {
    return({ type:GRADES, grades})
}

export const setFilter = (filters) => {
    return ({type: FILTER, filters});
}

export const setPositions = (positions) => {
    return ({type: POSITIONS, positions});
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

export const takeSteps = () => async (dispatch) => {
    let response = await MainAPI.takeSteps();
    dispatch(setSteps(response));
}
export const TakeGradesInfo = () => async (dispatch) => {
    let response = await MainAPI.gradesAPI();
    dispatch(takeGrades(response));
}

export const takeNames = (role_id) => async (dispatch) => {
    const response = await MainAPI.takeNames(role_id);
   if (mapRoleIdToRole(role_id)===Roles.HR) dispatch(setHrNames(response));
   if (mapRoleIdToRole(role_id)===Roles.Employee) dispatch(setWorkersNames(response));
   if (mapRoleIdToRole(role_id)===Roles.Director) dispatch(setSupersNames(response));
}

export const takePositions = () => async (dispatch) => {
    const response = await MainAPI.takePositions();
    dispatch(setPositions(response));
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
    dispatch(setPlansAmount(response));
    console.log(response);
}
