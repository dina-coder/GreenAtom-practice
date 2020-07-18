import { MainAPI } from '../../API.js'
let initialState = {
    planForSuper: []
}

const SuperReducer = (state = initialState, action) => {
    switch (action.type) {
        case TAKE_PROFILE_INFO: {
            return { ...state, planForSuper: action.planForSuper }
        }
        default:
            return state
    }
}
export default SuperReducer

const TAKE_PROFILE_INFO = 'TAKE_PROFILE_INFO'


export const SetProfileInfo = (planForSuper) => {
    return ({ type: TAKE_PROFILE_INFO, planForSuper })
}



export const TakeInfo = (user_id) => async (dispatch) => {
    let response = await MainAPI.takeData(user_id)
    dispatch(SetProfileInfo(response))
}




