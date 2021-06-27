import React from 'react';
import { expenseType } from '../app/constants/Types';
import { format } from 'date-fns'

let ExpenseItem: React.FC<{expense: expenseType}> = function(props) {
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
    return <li key={props.expense.id} className="expense-item elevated" style={expItemStyle}>
        <div>
            <h6 className="header" style={headerStyle}>{expense.name}</h6>
            <p className="h6">{format(expense.date, 'dd/MM/yyyy')}</p>
        </div>
        <h6 style={{color: 'var(--sec-color)'}}>₹ {expense.amount}</h6>
    </li>;
}

export default ExpenseItem;