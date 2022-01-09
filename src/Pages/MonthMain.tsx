import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

import { expenseType, monthlyBudgetType } from "../app/constants/Types";
import MonthBudgetForm from "../components/MonthBudgetForm";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseItem from "../components/ExpenseItem";
import { updateMonthBudget } from "../app/reducers/monthlyBudgetReducer";
import { addUserExpense, deleteUserExpense, getExpenseByMonthYear, updateUserExpense } from "../app/reducers/expenseReducer";
import { getExpenses } from "../app/store";
import ConfirmPopup from "../components/ConfirmPopup";

type propType = {
  budget: monthlyBudgetType,
  month: number,
  year: number,
}

const MonthMain: React.FC<propType> = function (props) {
  let { budget, month, year } = props;
  let [updateBudgetform, toggleUpdateBudgetform] = useState(false);
  let [addExpenseForm, toggleAddExpenseForm] = useState(false);
  let [editExpenseForm, toggleEditExpenseForm] = useState(false);
  let [deleteExpensePopup, toggleDeletePopup] = useState(false);

  let expenseToUpdate = React.useRef({ id: '', name: '', amount: 0, date: '' });

  const dispatch = useDispatch();

  function submitUpdateBudget(payload: monthlyBudgetType) {
    dispatch(updateMonthBudget(payload));
  }

  function submitNewExpense(payload: expenseType) {
    let newPayload = {
      expense: { ...payload },
      month: month,
      year: year,
    }
    dispatch(addUserExpense(newPayload));
  }

  function submitUpdatedExpense(payload: expenseType) {
    let newPayload = {
      expense: { ...payload },
      month: month,
      year: year,
    }
    dispatch(updateUserExpense(newPayload));
  }

  function deleteExpense(payload: expenseType) {
    let newPayload = {
      id: payload.id,
      month: month,
      year: year,
    }
    dispatch(deleteUserExpense(newPayload));
  }

  function openEditExpenseForm(payload: expenseType) {
    expenseToUpdate.current = payload;
    toggleEditExpenseForm(true);
  }
  function closeEditExpenseForm() {
    expenseToUpdate.current = { id: '', name: '', amount: 0, date: '' };
    toggleEditExpenseForm(false);
  }
  function openDeletePopup(payload: expenseType) {
    expenseToUpdate.current = payload;
    toggleDeletePopup(true);
  }
  function closeDeleteExpensePopup() {
    expenseToUpdate.current = { id: '', name: '', amount: 0, date: '' };
    toggleDeletePopup(false);
  }

  return <section className="container-fluid mt-2">
    <div className="row">
      <span className="col-12 pl-0 fc-pr">
        Current Budget ₹ {budget.amount}
        <button className="icon-btn ml-3" onClick={e => toggleUpdateBudgetform(true)}>
          <FontAwesomeIcon className="icon" icon={faPen} />
          <span className="pl-2 d-sm-none">Update</span>
        </button>

        <button className="icon-btn ml-3" onClick={e => toggleAddExpenseForm(true)}>
          <FontAwesomeIcon className="icon" icon={faPlus} />
          <span className="pl-2 d-sm-none">Add Expense</span>
        </button>
      </span>
    </div>
    <div className="row mt-2">
      <div className="col-8 col-md-6 col-sm-12 g-0">
        <div className="col12">
          <h6 className="fc-pr">Expenses</h6>
        </div>
        <ExpenseList month={month} year={year} onEdit={openEditExpenseForm}
          onDelete={openDeletePopup} />
      </div>
      <div className="col-4 col-md-6 col-sm-12 g-0"></div>
    </div>
    <MonthBudgetForm active={updateBudgetform} close={() => toggleUpdateBudgetform(false)}
      onSubmit={submitUpdateBudget} budget={budget} mode="update" />

    <ExpenseForm active={addExpenseForm} close={() => toggleAddExpenseForm(false)} mode={"create"}
      submit={submitNewExpense} expense={{ id: '', name: '', amount: 0, date: '' }} />

    <ExpenseForm active={editExpenseForm} close={closeEditExpenseForm} mode={"update"}
      submit={submitUpdatedExpense} expense={expenseToUpdate.current} />

    <ConfirmPopup active={deleteExpensePopup} onCancel={closeDeleteExpensePopup}
      payload={expenseToUpdate.current} onConfirm={deleteExpense}
      message={`Are you sure you want to delete ${expenseToUpdate.current.name}?`} />
  </section>;
}

let ExpenseList: React.FC<{
  year: number, month: number,
  onEdit?: (payload: expenseType) => void,
  onDelete?: (payload: expenseType) => void,
}> = function (props) {
  let { month, year } = props;
  let state = useSelector(getExpenses);
  let expenses = getExpenseByMonthYear(state, month, year);

  if (!expenses) {
    return null;
  }

  return <div className="container-fluid mt-3">
    <ul className="row">
      {
        expenses.map(exp => <li key={exp.id} className="col-6 col-md-12 col-sm-6 col-xs-12">
          <ExpenseItem expense={exp} allowEdit={true} onClick={props.onEdit}
            allowDelete={true} onDelete={props.onDelete} />
        </li>)
      }
    </ul>
  </div>
}

export default MonthMain;