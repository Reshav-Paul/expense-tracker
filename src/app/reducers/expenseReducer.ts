import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { actionType, expenseType, expenseCollection } from '../constants/Types';
import { createReducer, updateItemInArrayById, updateItemInArrayByPredicate, updateObject } from './stateHandlerUtilities';

const initialState: expenseCollection[] = [];

function addNewExpense(state: expenseCollection[], action: actionType) {
  let { id, date, name, amount } = action.payload.expense as expenseType;

  if (!id) id = uuidv4();

  let newExpense: expenseType = { id, date, name, amount };
  newExpense.date = format(new Date(newExpense.date), 'dd/MM/yyyy');

  let { month, year } = action.payload;
  let expenseCollection: expenseCollection = state.filter(ec => ec.month === month && ec.year === year)[0];
  if (expenseCollection) {
    let newExpCollection = updateObject(expenseCollection, { expenses: [...expenseCollection.expenses, newExpense] })
    state = updateItemInArrayByPredicate(
      [...state],
      function (ec: expenseCollection) { return ec.month === month && ec.year === year; },
      () => newExpCollection
    );
  } else {
    state = [...state, {
      month,
      year,
      expenses: [newExpense]
    }]
  }

  return state;
}

function updateExpense(state: expenseCollection[], action: actionType) {
  let { id, date, name, amount } = action.payload.expense as expenseType;
  debugger;
  if (!id) return state;

  let newExpense: expenseType = { id, date, name, amount };
  newExpense.date = format(new Date(newExpense.date), 'dd/MM/yyyy');

  let { month, year } = action.payload;
  let expenseCollection: expenseCollection = state.filter(ec => ec.month === month && ec.year === year)[0];

  if (!expenseCollection) return state;
  let newExpenses = updateItemInArrayById(expenseCollection.expenses, id, () => newExpense);
  let newExpCollection = updateObject(expenseCollection, { expenses: newExpenses });
  state = updateItemInArrayByPredicate(
    state,
    function (ec: expenseCollection) { return ec.month === month && ec.year === year; },
    () => newExpCollection
  );
  return state;
}

function deleteExpense(state: expenseCollection[], action: actionType) {
  let { month, year, id } = action.payload;
  if (!id || !month || !year) return state;

  let expenseCollection: expenseCollection = state.filter(ec => ec.month === month && ec.year === year)[0];
  if (!expenseCollection) return state;

  expenseCollection.expenses = expenseCollection.expenses.filter(ep => ep.id !== id);
  state = updateItemInArrayByPredicate(
    state,
    function (ec: expenseCollection) { return ec.month === month && ec.year === year; },
    () => expenseCollection
  );
  return state;
}

const expenseReducer = createReducer(initialState, {
  'expense/add': addNewExpense,
  'expense/update': updateExpense,
  'expense/delete': deleteExpense,
});

export default expenseReducer;

// action creators
export function addUserExpense(payload: any) {
  return { type: 'expense/add', payload }
}

export function updateUserExpense(payload: any) {
  return { type: 'expense/update', payload }
}

export function deleteUserExpense(payload: any) {
  return { type: 'expense/delete', payload }
}

// data extractors
export function getExpenseByMonthYear(state: expenseCollection[], month: number, year: number): expenseType[] | undefined {
  if (!year || !month) return;
  let expenseCollection = state.filter(ep => ep.month === month && ep.year === year)[0];
  if (expenseCollection) return expenseCollection.expenses;
}