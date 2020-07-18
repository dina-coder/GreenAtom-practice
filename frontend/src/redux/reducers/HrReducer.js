import { MainAPI } from '../../API.js'
import { act } from 'react-dom/test-utils'
let initialState = {
    planForHr:[]
}

const HrReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLANS_FOR_HR: {
            return { ...state, planForHr: action.planForHr }
        }
        
        default:
            return state
    }
}

export default HrReducer

const SET_PLANS_FOR_HR='SET_PLANS_FOR_HR'

export const SetHrPlanInfo = (planForHr) => {
    return ({ type: SET_PLANS_FOR_HR, planForHr })
}

export const TakeHRPlan = () => async (dispatch) => {
    let response = await MainAPI.takeplan_HR()
    console.log(response)
    dispatch(SetHrPlanInfo(response))
}


