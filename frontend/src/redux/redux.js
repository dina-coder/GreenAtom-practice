import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import AuthReducer from "./AuthReducer";
import thunkMiddleware from 'redux-thunk'

let reducers=combineReducers({
    form:formReducer,
    AuthReducer:AuthReducer

})
let store=createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
