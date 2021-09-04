import { actionType, yearlyBudgetType } from '../constants/Types';
import { createReducer, updateItemInArrayByPredicate } from './stateHandlerUtilities';


const initialState: yearlyBudgetType[] = [];


function updateYearlyBudget(state: yearlyBudgetType[], action: actionType) {
  const existingBudget: yearlyBudgetType = state.filter(b => b.year === action.payload.year)[0];
  if (!existingBudget) {
    state = [...state, {
      year: action.payload.year,
      amount: action.payload.amount,
    }];
  } else {
    existingBudget.amount = action.payload.amount;
    state = updateItemInArrayByPredicate(
      state,
      (budget: yearlyBudgetType) => budget.year === action.payload.year,
      () => existingBudget
    );
  }
  return state;
}

const yearBudgetReducer = createReducer(initialState, {
  'budget/year/update': updateYearlyBudget,
});

export default yearBudgetReducer;