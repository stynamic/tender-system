import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountsReducer from './accountsReducer';
import tendersReducer from './tendersReducer';
import tenderReducer from './tenderReducer';
import tenderPassedReducer from './tenderPassedReducer';

export default combineReducers({
    accounts: accountsReducer,
    tendersList: tendersReducer,
    tender: tenderReducer,
    tenderPassed: tenderPassedReducer,
    form: formReducer
});