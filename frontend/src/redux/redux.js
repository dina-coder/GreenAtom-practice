import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import AuthReducer from "./reducers/AuthReducer";
import thunkMiddleware from 'redux-thunk'
import EmployeeReducer from './reducers/EmployeeReducer';
import PlansReducer from './reducers/PlansReducer';
import DictReducer from './reducers/DictReducer';
let reducers=combineReducers({
    form:formReducer,
    AuthReducer:AuthReducer,
    EmployeeReducer:EmployeeReducer,
    PlansReducer:PlansReducer,
    DictReducer: DictReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
