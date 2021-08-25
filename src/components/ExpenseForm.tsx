import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { HoverForm } from "./utility";
import { expenseType } from '../app/constants/Types';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type propType = {
	active: boolean,
	mode: 'update' | 'create',
	submit: (payload: expenseType) => void,
	close: () => void,
	expense: expenseType,
}

let ExpenseForm: React.FC<propType> = function (props) {
	let { active, close, mode, submit, expense } = props;
	let modeText = 'Add';
	if (mode === 'update') modeText = 'Update';

	let [state, setState] = useState({
		name: expense.name,
		amount: expense.amount ? expense.amount.toString() : ''
	});

	React.useEffect(() => {
		setState({
			name: props.expense.name,
			amount: props.expense.amount ? props.expense.amount.toString() : ''
		});
	}, [props.expense]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		let numAmount = parseInt(state.amount);
		submit({
			id: mode === 'update'? expense.id : uuidv4(),
			name: state.name,
			amount: numAmount,
			date: (new Date()).toString(),
		});
		props.close();
		setState({ name: '', amount: '' });
	}

	return <HoverForm active={active} close={close} submit={handleSubmit}>
		<div className="pt-2">
			<div className="d-flex jc-between ai-center mb-4">
				<h5>{modeText} Expense</h5>
				<FontAwesomeIcon icon={faTimes} className="icon lg" onClick={e => props.close()}></FontAwesomeIcon>
			</div>
			<div className="d-flex jc-between ai-center mb-2">
				<label htmlFor="expense-name">Name</label>
				<input type="text" name="expense-name" className="m-0 ml-2"
					value={state.name} onChange={e => setState({ ...state, name: e.target.value })
					} />
			</div>
			<div className="d-flex jc-between ai-center">
				<label htmlFor="expense-amount">Amount</label>
				<input type="text" name="expense-amount" className="m-0 ml-2"
					value={state.amount} onChange={e => setState({ ...state, amount: e.target.value })} />
			</div>
		</div>
		<button className="btn as-center m-0 mt-2">{modeText}</button>
	</HoverForm>
}

export default ExpenseForm;