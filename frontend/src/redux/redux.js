import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import AuthReducer from "./reducers/AuthReducer";
import thunkMiddleware from 'redux-thunk'

let reducers=combineReducers({
    form:formReducer,
    AuthReducer:AuthReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
