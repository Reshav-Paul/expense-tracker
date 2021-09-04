import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
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
});

// selectors
export const getProfile = (state: stateType) => state.profile;
export const getTheme = (state: stateType) => state.profile.currentTheme;
export const getYearBudgets = (state: stateType) => state.yearBudgets;
export const getMonthBudgets = (state: stateType) => state.monthBudgets;
export const getExpenses = (state: stateType) => state.expenses;