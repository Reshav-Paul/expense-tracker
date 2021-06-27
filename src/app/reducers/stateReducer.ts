import { createSlice } from '@reduxjs/toolkit';
import { stateType, profileType, budgetType, yearlyBudgetType } from '../constants/Types';

const initialState: stateType = {
    profile: {
        firstName: '',
        currentBudget: {
            currentMonthBudget: undefined,
            currentYearBudget: undefined,
        }
    },
    budgets: [],
    yearlyBudgets: [],
}

export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        updateProfile: (state: stateType, action) => {
            let newProfile: profileType = action.payload;
            state.profile = newProfile;
            console.log(state.profile);
            return state;
        },
        addBudget: (state: stateType, action) => {
            let newBudget: budgetType = action.payload;
            state.budgets = state.budgets
                .filter(b => b.month !== newBudget.month && b.year !== newBudget.year);
            state.budgets = [...state.budgets, newBudget];
            return state;
        },
        addYearlyBudget: (state, action) => {
            let newBudget: yearlyBudgetType = action.payload;
            state.yearlyBudgets = state.yearlyBudgets
                .filter(b => b.year !== newBudget.year);
            state.yearlyBudgets = [...state.yearlyBudgets, newBudget];
            return state;
        }
    }
});

export const { updateProfile, addBudget, addYearlyBudget } = stateSlice.actions;

export const getProfile = (state: stateType) => state.profile;
export const getBudgets = (state: stateType, month: number, year: number) => {
    if (!month && !year) return state.budgets;
    if (!year) {
        return state.budgets
        .filter(b => b.month === month);
    }
    if (!month) {
        return state.budgets
        .filter(b => b.year === year);
    }
}
export const getBudget = (state: stateType, month: number, year: number) => {
    if (!month || !year) return null;
    let budgets = state.budgets
        .filter(b => b.month === month && b.year === year);
    if (budgets.length > 0) return budgets[0];
    else return null;
}

export const getYearlyBudgets = (state: stateType, year: number) => {
    if (year) {
        let budgets = state.yearlyBudgets.filter(b => b.year === year);
        if (budgets.length > 0) return budgets;
        return null;
    }
    return state.yearlyBudgets;
}

export default stateSlice.reducer;