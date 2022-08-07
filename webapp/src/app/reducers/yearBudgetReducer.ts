import { createReducer, updateObject } from "../../utilities/stateHandlerUtilities";
import { yearBudgetActionType, yearBudgetStateType, yearBudgetType } from "../../utilities/types";

export const yearBudgetInitialState: yearBudgetStateType = {
  budgets: [],
  initialFetchFailed: 0,
};

function yearBudgetHandler(state: yearBudgetStateType, action: yearBudgetActionType) {
  const existingBudgets = state.budgets.filter(b => b.id !== action.payload.id); // filter out budget if it already exists
  let newBudgets = [...existingBudgets, action.payload];
  updateObject(state, { budgets: newBudgets });
  return state;
}

const yearBudgetReducer = createReducer(yearBudgetInitialState, {
  'year/add': yearBudgetHandler,
  'year/update': yearBudgetHandler,
});

export default yearBudgetReducer;

export function addYearBudget(payload: yearBudgetType) {
  return { type: 'year/add', payload }
}

export function updateYearBudget(payload: yearBudgetType) {
  return { type: 'year/update', payload }
}