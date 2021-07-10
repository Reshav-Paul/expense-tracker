import { createSlice, current } from '@reduxjs/toolkit';
import { budgetStateType, profileType, budgetType, yearlyBudgetType, stateType } from '../constants/Types';

const initialState: budgetStateType = {
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
        updateProfile: (state: budgetStateType, action) => {
            let newProfile: profileType = action.payload;
            state.profile = newProfile;
            console.log(state.profile);
            return state;
        },
        addBudget: (state: budgetStateType, action) => {
            let newBudget: budgetType = action.payload;
            state.budgets = state.budgets
                .filter(b => b.month !== newBudget.month || b.year !== newBudget.year);
            state.budgets = [...state.budgets, newBudget];
            console.log(current(state));
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

export const getBudgetState = (state: stateType) => state.budget;

export const getProfile = (state: budgetStateType) => state.profile;
export const getBudgets = (state: budgetStateType, month: number, year: number) => {
    if (!state.budgets) return [];
    if (!month && !year) return state.budgets;
    if (!year) {
        return state.budgets
            .filter(b => b.month === month);
    }
    if (!month) {
        return state.budgets
            .filter(b => b.year === year);
    }

    return state.budgets
        .filter(b => b.year === year && b.month === month);
}
export const getBudget = (state: budgetStateType, month: number, year: number) => {
    if (!month || !year) return null;
    let budgets = state.budgets
        .filter(b => b.month === month && b.year === year);
    if (budgets.length > 0) return budgets[0];
    else return null;
}

export const getYearlyBudgets = (state: budgetStateType, year: number) => {
    if (year) {
        let budgets = state.yearlyBudgets.filter(b => b.year === year);
        if (budgets.length > 0) return budgets;
        return null;
    }
    return state.yearlyBudgets;
}

export const getYears = (state: budgetStateType) => {
    let years: number[] = [];
    state.budgets.forEach(b => {
        if (years.indexOf(b.year) < 0) years.push(b.year);
    });
    return years;
}

export default stateSlice.reducer;