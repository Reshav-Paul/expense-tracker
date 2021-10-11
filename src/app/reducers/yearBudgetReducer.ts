import { actionType, yearlyBudgetType } from '../constants/Types';
import { createReducer, updateItemInArrayByPredicate, updateObject } from './stateHandlerUtilities';


const initialState: yearlyBudgetType[] = [];

function addYearlyBudget(state: yearlyBudgetType[], action: actionType) {
  state = [...state, {
    year: action.payload.year,
    amount: action.payload.amount,
  }];
  return state;
}

function updateYearlyBudget(state: yearlyBudgetType[], action: actionType) {
  let existingBudget: yearlyBudgetType = state.filter(b => b.year === action.payload.year)[0];
  let newBudget = updateObject(existingBudget, { amount: action.payload.amount })
  state = updateItemInArrayByPredicate(
    state,
    (budget: yearlyBudgetType) => budget.year === action.payload.year,
    () => newBudget
  );
  return state;
}

const yearBudgetReducer = createReducer(initialState, {
  'budget/year/add': addYearlyBudget,
  'budget/year/update': updateYearlyBudget,
});

// action creators
export function addYearBudget(payload: any): actionType {
  return { type: 'budget/year/add', payload: payload };
}

export function updateYearBudget(payload: any): actionType {
  return { type: 'budget/year/update', payload: payload };
}

export default yearBudgetReducer;