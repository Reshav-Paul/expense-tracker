import React from 'react';
import { recentExpenses } from '../app/constants/TestData';
import ExpenseItem from './ExpenseItem';

let Home: React.FC<{}> = function (props) {

    const rexpStyle = {
        paddingRight: '1rem',
        maxWidth: '360px',
    }
    const headerStyle = {
        marginBottom: '1rem',
    }
    const itemStyle = {
        padding: '1rem',
        maxHeight: '350px',
    }
    return <section id="home">
        <div className="recent-exp" style={rexpStyle}>
            <h3 className="hc-text header" style={headerStyle}>Recent Expenses</h3>
            <ul className="items elevated" style={itemStyle}>
                {recentExpenses.map(exp => <ExpenseItem expense={exp} />)}
            </ul>
        </div>

    </section>;
}

export default Home;