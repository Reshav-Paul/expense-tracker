import { createSlice, current } from '@reduxjs/toolkit';
import { format } from 'date-fns';

import { userStateType, profileType, budgetType, yearlyBudgetType, stateType, expenseType, expenseCollection } from '../constants/Types';

const initialState: userStateType = {
	profile: {
		firstName: '',
		currentBudget: {
			currentMonthBudget: undefined,
			currentYearBudget: undefined,
		}
	},
	budgets: [],
	yearlyBudgets: [],
	expenses: [],
}

export const stateSlice = createSlice({
	name: 'state',
	initialState,
	reducers: {
		updateProfile: (state: userStateType, action) => {
			let newProfile: profileType = action.payload;
			state.profile = newProfile;
			return state;
		},
		addBudget: (state: userStateType, action) => {
			let newBudget: budgetType = action.payload;
			state.budgets = state.budgets
				.filter(b => b.month !== newBudget.month || b.year !== newBudget.year);
			state.budgets = [...state.budgets, newBudget];
			return state;
		},
		addYearlyBudget: (state, action) => {
			let newBudget: yearlyBudgetType = action.payload;
			state.yearlyBudgets = state.yearlyBudgets
				.filter(b => b.year !== newBudget.year);
			state.yearlyBudgets = [...state.yearlyBudgets, newBudget];
			return state;
		},
		addExpense: (state, action) => {
			let newExpense: expenseType = {
				id: action.payload.id,
				name: action.payload.name,
				date: action.payload.date,
				amount: action.payload.amount,
			};
			newExpense.date = format(new Date(newExpense.date), 'dd/MM/yyyy');
			let month: number = action.payload.month;
			let year: number = action.payload.year;
			
			let expCollection = state.expenses.filter(e => e.month === month && e.year === year)[0];
			if (!expCollection) {
				state.expenses.push({ month: month, year: year, expenses: [newExpense] });
			} else {
				state.expenses = state.expenses.map(e => e.year === year && e.month === month
					? {
						month: e.month,
						year: e.year,
						expenses: [...e.expenses, newExpense]
					}
					: e
				);
			}
		},

		editExpense: (state, action) => {
			let newExpense: expenseType = {
				id: action.payload.id,
				name: action.payload.name,
				date: action.payload.date,
				amount: action.payload.amount,
			};
			newExpense.date = format(new Date(newExpense.date), 'dd/MM/yyyy');
			let month: number = action.payload.month;
			let year: number = action.payload.year;

			let expCollection = state.expenses.filter(e => e.month === month && e.year === year)[0];
			state.expenses = state.expenses.filter(e => e.month !== month && e.year !== year);
			console.log(current(state));
			if (expCollection) {
				let newExpList = expCollection.expenses.map(exp => exp.id === newExpense.id
					? newExpense
					: exp
				);

				state.expenses = [...state.expenses, {
					year: expCollection.year,
					month: expCollection.month,
					expenses: newExpList
				}];

				console.log(current(state));
			}
		}
	}
});

export const { updateProfile, addBudget, addYearlyBudget, addExpense, editExpense } = stateSlice.actions;

export const getUserState = (state: stateType) => state.budget;
export const getProfile = (state: userStateType) => state.profile;

export const getBudgets = (state: userStateType, month: number, year: number) => {
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
export const getBudget = (state: userStateType, month: number, year: number) => {
	if (!month || !year) return null;
	let budgets = state.budgets
		.filter(b => b.month === month && b.year === year);
	if (budgets.length > 0) return budgets[0];
	else return null;
}

export const getYearlyBudgets = (state: userStateType, year: number) => {
	if (year) {
		let budgets = state.yearlyBudgets.filter(b => b.year === year);
		if (budgets.length > 0) return budgets;
		return null;
	}
	return state.yearlyBudgets;
}

export const getYears = (state: userStateType) => {
	let years: number[] = [];
	state.budgets.forEach(b => {
		if (years.indexOf(b.year) < 0) years.push(b.year);
	});
	return years;
}

export const getExpense = (state: userStateType,
	month: number, year: number, id?: string): expenseType[] => {
	let expenseColl: expenseCollection[] = [];
	let expenses: expenseType[] = [];

	if (year && month) expenseColl = state.expenses
		.filter(e => e.month === month && e.year === year);
	if (year) expenseColl = state.expenses
		.filter(e => e.year === year);
	if (month) expenseColl = state.expenses
		.filter(e => e.month === month);
	if (id) {
		expenseColl.forEach(ec => ec.expenses.forEach(ep =>
			ep.id === id && expenses.push(ep)));
	} else {
		expenseColl.forEach(ec => ec.expenses.forEach(ep => expenses.push(ep)));
	}

	return expenses;
}

export default stateSlice.reducer;