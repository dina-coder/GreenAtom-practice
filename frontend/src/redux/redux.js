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

const saveState = (state) => {
    try {
        const serialisedState = JSON.stringify(state);
        window.localStorage.setItem('app_state', serialisedState);
    } catch (err) {
    }
};
const loadState = () => {
    try {
        const serialisedState = window.localStorage.getItem('app_state');
        if (!serialisedState) return undefined;
        return JSON.parse(serialisedState);
    } catch (err) {
        return undefined;
    }
};
const oldState = loadState();
export const store = createStore(reducers,oldState, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
    saveState(store.getState());
});


