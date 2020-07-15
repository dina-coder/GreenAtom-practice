import {MainAPI} from '../API.js'

let  initialState={
    name:null,
    user_id:null,
    role_id:null,
    isAuth:false
}

const AuthReducer=(state = initialState,action)=>{
    switch(action.type){
        case  SET_AUTH_USER:{
            return{...state, ...action.payload}

        }
        default:
            return state
    }
}
export default AuthReducer
const SET_AUTH_USER='SET_AUTH_USER'

export const SetAuthCreation=(name,user_id,role_id, isAuth)=>{
    return({type:SET_AUTH_USER, payload:{name,user_id,role_id,isAuth}});
}



export const login=(email,password)=>
    async (dispatch)=>{
        let response=await MainAPI.login(email,password);
        console.log(response)
        dispatch(SetAuthCreation(response.name,response.user_id,response.role_id,true))
   

   }




