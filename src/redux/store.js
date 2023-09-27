import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './authReducer';
import snackBarReducer from "./snackBarReducer";
import basicReducer from "./basicReducer";
import collectionReducer from "./collectionReducer";
import debitCardReducer from "./financial/debit-card/debitCardReducer";
import permission from './permission/permissionReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import testReducer from "./testReducer";
import settlementReducer from "./settlement_list/settlementReducer";
import merchant from './merchant/merchantReducer';
import rollOver from './rollOverReducer'
import background from './background/backgroundRedux';
import log from './log/logReducer';

const rootReducer = combineReducers({
    authState: authReducer,
    snackBarState: snackBarReducer,
    basicState: basicReducer,
    collectionState: collectionReducer,
    debitCardState: debitCardReducer,
    testState: testReducer,
    settlementState: settlementReducer,
    permissionState : permission.reducer,
    merchantState : merchant.reducer,
    backgroundState : background.reducer,
    logState : log.reducer,
    rollOverState: rollOver
})


export default configureStore({
    reducer: rootReducer
}, composeWithDevTools);