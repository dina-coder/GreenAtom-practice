import { MainAPI } from '../../API.js'
let initialState = {
    profile: []
}

const SuperReducer = (state = initialState, action) => {
    switch (action.type) {
        case TAKE_PROFILE_INFO: {
            console.log(action.profile)
            return { ...state, profile: action.profile }
        }
        default:
            return state
    }
}
export default SuperReducer

const TAKE_PROFILE_INFO = 'TAKE_PROFILE_INFO'


export const SetProfileInfo = (profile) => {
    return ({ type: TAKE_PROFILE_INFO, profile })
}



export const TakeInfo = (user_id) => async (dispatch) => {
    let response = await MainAPI.takeData(user_id)
    dispatch(SetProfileInfo(response))
}




