import { MainAPI } from '../../API.js';
import { Roles } from '../../constants/roles';
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';

let initialState = {
    stepList: [],
    workersNames: [],
    supersNames: [],
    hrNames: [],
    positions: [],
    grades: []
}
const DictReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default: {
            return {...state}
        }
    }
}

const STEPS = 'STEPS';
const WORKERS_NAMES = 'WORKERS_NAMES';
const SUPERS_NAMES = 'SUPERS_NAMES';
const POSITIONS = 'POSITIONS';
const HR_NAMES = 'HR_NAMES';
const GRADES = 'GRADES';

export const setSteps = (stepList) => {
    return ({type: STEPS,stepList})
}

export const setWorkersNames = (nameList) => {
    return ({ type: WORKERS_NAMES, nameList})
}
export const setHrNames = (nameList) => {
    return ({ type: HR_NAMES, nameList })
}
export const setSupersNames = (nameList) => {
    return({ type:SUPERS_NAMES, nameList})
}
export const takeGrades = (grades) => {
    return({ type:GRADES, grades})
}
export const setPositions = (positions) => {
    return ({type: POSITIONS, positions});
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

export default DictReducer;