import { actionType, monthlyBudgetType } from '../constants/Types';
import { createReducer, updateItemInArrayByPredicate, updateObject } from './stateHandlerUtilities';


const initialState: monthlyBudgetType[] = [];

function addMonthlyBudget(state: monthlyBudgetType[], action: actionType) {
  let { year, month, amount } = action.payload;
  if (year > 0 && month > 0 && month <= 12 && amount >= 0) {
    state = [...state, { year, month, amount }];
  }
  return state;
}

function updateMonthlyBudget(state: monthlyBudgetType[], action: actionType) {
  let { year, month, amount } = action.payload;
  let existingBudget: monthlyBudgetType = state.filter(b => b.year === year
    && b.month === month)[0];
  if (existingBudget) {
    let newBudget = updateObject(existingBudget, { amount })
    state = updateItemInArrayByPredicate(
      state,
      (budget: monthlyBudgetType) => budget.year === year
        && budget.month === month,
      () => newBudget
    );
  }
  return state;
}

const monthBudgetReducer = createReducer(initialState, {
  'budget/month/add': addMonthlyBudget,
  'budget/month/update': updateMonthlyBudget,
});

export default monthBudgetReducer;

// action creators
export function addMonthBudget(payload: any) {
  return { type: 'budget/month/add', payload }
}

export function updateMonthBudget(payload: any) {
  return { type: 'budget/month/update', payload }
}

// data extractors
export function getBudgetByMonthYear(state: monthlyBudgetType[], month: number, year: number) {
  return state.filter(b => b.year === year && b.month === month)[0];
}

export function getYearsFromMonthBudget(state: monthlyBudgetType[]) {
  let years: number[] = [];
  state.forEach(function (budget) {
    if (years.indexOf(budget.year) === -1) {
      years.push(budget.year);
    }
  });

  return years;
}