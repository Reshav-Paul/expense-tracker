import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'

import themeReducer from './reducers/themeReducer';
import stateReducer from './reducers/stateReducer';



export const store = configureStore({
    reducer: combineReducers({
        theme: themeReducer,
        budget: stateReducer,
    }),
});