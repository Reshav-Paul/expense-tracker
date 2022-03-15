import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import thunk from 'redux-thunk';

import { stateType } from './constants/Types';
import expenseReducer from './reducers/expenseReducer';
import monthBudgetReducer from './reducers/monthlyBudgetReducer';
import profileReducer from './reducers/profileReducer';
import yearBudgetReducer from './reducers/yearBudgetReducer';

export const store = configureStore({
  reducer: combineReducers({
    profile: profileReducer,
    yearBudgets: yearBudgetReducer,
    monthBudgets: monthBudgetReducer,
    expenses: expenseReducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// selectors
export const getProfile = (state: stateType) => state.profile;
export const getUserID = (state: stateType) => state.profile.userId;
export const getUserToken = (state: stateType) => state.profile.authToken;
export const getLoginStatus = (state: stateType) => state.profile.userId ? true : false;
export const getUserUpdateStatus = (state: stateType) => state.profile.updatingStatus;
export const getYBudgetUpdateStatus = (state: stateType) => state.profile.yBudgetUpdatingStatus;
export const getYBudgetLoadingStatus = (state: stateType) => state.profile.yBudgetLoadingStatus;
export const getTheme = (state: stateType) => state.profile.currentTheme;
export const getYearBudgets = (state: stateType) => state.yearBudgets;
export const getMonthBudgets = (state: stateType) => state.monthBudgets;
export const getExpenses = (state: stateType) => state.expenses;