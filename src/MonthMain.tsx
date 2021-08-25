import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

import { budgetType, expenseType } from "./app/constants/Types";
import MonthBudgetForm from "./components/MonthBudgetForm";
import { addBudget, addExpense, getUserState, getExpense, editExpense } from './app/reducers/userStateReducer';
import ExpenseForm from "./components/ExpenseForm";
import ExpenseItem from "./components/ExpenseItem";

type propType = {
	budget: budgetType,
	month: number,
	year: number,
}

const MonthMain: React.FC<propType> = function (props) {
	let { budget, month, year } = props;
	let [updateBudgetform, toggleUpdateBudgetform] = useState(false);
	let [addExpenseForm, toggleAddExpenseForm] = useState(false);
	let [editExpenseForm, toggleEditExpenseForm] = useState(false);
	let expenseToUpdate = React.useRef({ id: '', name: '', amount: 0, date: '' });

	const dispatch = useDispatch();

	function submitBudgetForm(payload: budgetType) {
		dispatch(addBudget(payload));
	}

	function submitExpenseForm(payload: expenseType) {
		let newPayload = {
			...payload,
			month: month,
			year: year,
		}
		if (addExpenseForm) {
			dispatch(addExpense(newPayload));
		} else if (editExpenseForm) {
			console.log(newPayload);
			dispatch(editExpense(newPayload));
			// dispatch(updateExpense(newPayload));
		}
	}

	function openEditExpenseForm(payload: expenseType) {
		expenseToUpdate.current = payload;
		toggleEditExpenseForm(true);
	}
	function closeEditExpenseForm() {
		expenseToUpdate.current = { id: '', name: '', amount: 0, date: '' };
		toggleEditExpenseForm(false);
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
				<ExpenseList month={month} year={year} onEdit={openEditExpenseForm} />
			</div>
			<div className="col-4 col-md-6 col-sm-12 g-0"></div>
		</div>
		<MonthBudgetForm active={updateBudgetform} close={() => toggleUpdateBudgetform(false)}
			onSubmit={submitBudgetForm} budget={budget} mode="update" />

		<ExpenseForm active={addExpenseForm} close={() => toggleAddExpenseForm(false)} mode={"create"}
			submit={submitExpenseForm} expense={{ id: '', name: '', amount: 0, date: '' }} />

		<ExpenseForm active={editExpenseForm} close={closeEditExpenseForm} mode={"update"}
			submit={submitExpenseForm} expense={expenseToUpdate.current} />
	</section>;
}

let ExpenseList: React.FC<{
	year: number, month: number,
	onEdit?: (payload: expenseType) => void
}> = function (props) {
	let { month, year } = props;
	let state = useSelector(getUserState);
	let expenses = getExpense(state, month, year);

	return <div className="container-fluid mt-3">
		<ul className="row">
			{
				expenses.map(exp => <li key={exp.id} className="col-6 col-md-12 col-sm-6 col-xs-12">
					<ExpenseItem expense={exp} allowEdit={true} onClick={props.onEdit} />
				</li>)
			}
		</ul>
	</div>
}

export default MonthMain;