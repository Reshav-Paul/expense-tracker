import React from 'react';
import { expenseType } from '../app/constants/Types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

let ExpenseItem: React.FC<{
	expense: expenseType,
	allowEdit?: boolean,
	onClick?: (payload: expenseType) => void,
}> = function (props) {
	let expense = props.expense;

	const headerStyle = {
		marginBottom: '0.5rem',
	}
	const expItemStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '1rem',
		marginBottom: '1rem',
		borderRadius: '0.5rem',
	}
	return <div key={props.expense.id} className="expense-item elevated" style={expItemStyle}>
		<div>
			<h6 className="header" style={headerStyle}>{expense.name}</h6>
			<p className="h6">{expense.date}</p>
		</div>
		<div>
			<h6 className="mb-2" style={{ color: 'var(--sec-color)' }}>₹ {expense.amount}</h6>
			{
				props.allowEdit
					? <FontAwesomeIcon className="icon" icon={faPen} onClick={e => {
						e.preventDefault();
						console.log('object');
						props.onClick && props.onClick(expense);
					}} />
					: null
			}
		</div>
	</div>;
}

export default ExpenseItem;