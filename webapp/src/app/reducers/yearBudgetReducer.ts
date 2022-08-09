import { createReducer, updateObject } from "../../utilities/stateHandlerUtilities";
import { actionType, yearBudgetActionType, yearBudgetStateType, yearBudgetType } from "../../utilities/types";

export const yearBudgetInitialState: yearBudgetStateType = {
  budgets: [],
  initialFetches: 0,
};

function yearBudgetHandler(state: yearBudgetStateType, action: yearBudgetActionType) {
  const existingBudgets = state.budgets.filter(b => b.id !== action.payload.id); // filter out budget if it already exists
  let newBudgets = [...existingBudgets, action.payload];
  return updateObject(state, { budgets: newBudgets });
}

function yearBudgetIncrementFetch(state: yearBudgetStateType, action: actionType) {
  return updateObject(state, { initialFetches: state.initialFetches + 1 });
}

const yearBudgetReducer = createReducer(yearBudgetInitialState, {
  'year/add': yearBudgetHandler,
  'year/update': yearBudgetHandler,
  'year/fetchFails': yearBudgetIncrementFetch,
});

export default yearBudgetReducer;

export function addYearBudget(payload: yearBudgetType) {
  return { type: 'year/add', payload }
}

export function updateYearBudget(payload: yearBudgetType) {
  return { type: 'year/update', payload }
}

export function incrementYearBudgetFetches() {
  return { type: 'year/fetchFails' }
}