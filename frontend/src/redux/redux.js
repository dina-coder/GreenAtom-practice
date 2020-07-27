import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
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
    let initialState = {AuthReducer:state.AuthReducer}
    try {

        const serialisedState = JSON.stringify(initialState);
        window.sessionStorage.setItem('app_state', serialisedState);
    } catch (err) {
    }
};
const loadState = () => {
    try {
        const serialisedState = window.sessionStorage.getItem('app_state');
        if (!serialisedState) return undefined;
        return JSON.parse(serialisedState);
    } catch (err) {
        return undefined;
    }
};

const oldState = loadState();
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

export const store = createStore(reducers, oldState, composeEnhancers(applyMiddleware(thunkMiddleware)));
store.subscribe(() => {
    saveState(store.getState());
});


