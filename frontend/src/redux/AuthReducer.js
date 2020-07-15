
let  initialState={
    userId:null,
    email:null,
    isAuth:false
}

const AuthReducer=(state=initialState,action)=>{
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

export const SetAuthCreation=(userId,email,login,isAuth)=>{
    return({type:SET_AUTH_USER, payload:{userId,email,login,isAuth}});
}

//export const AuthMeCreator=()=> async (dispatch)=>{
  //  let response=await MainApi.authMe()
    //if (response.data.resultCode===0){
      //  let {id,email,login}=response.data.data;
        //dispatch(SetAuthCreation(id,email,login,true))
    //}
//}


export const login=(email,password)=>
    async (dispatch)=>{
        await console.log(email,password)
        //let response=await MainApi.login(email,password,rememberMe);
    //    if (response.data.resultCode===0){
    //        dispatch(AuthMeCreator())
     //   } else { let message=response.data.messages.length>0 ? response.data.messages:'Some error'
    //        dispatch(stopSubmit('login', {_error :message}))}

   }




