import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import AuthReducer from "./reducers/AuthReducer";
import thunkMiddleware from 'redux-thunk'
import EmployeeReducer from './reducers/EmployeeReducer';
import SuperReducer from './reducers/SuperReducer';
import HrReducer from './reducers/HrReducer';

let reducers=combineReducers({
    form:formReducer,
    AuthReducer:AuthReducer,
    EmployeeReducer:EmployeeReducer,
    SuperReducer:SuperReducer,
    HrReducer:HrReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
