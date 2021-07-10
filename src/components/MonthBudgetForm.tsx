import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { budgetType } from '../app/constants/Types';
import { monthMap } from '../app/constants/utilityData';

let MonthBudgetForm: React.FC<{
    active: boolean,
    close: () => void,
    onSubmit: (payload: budgetType) => void,
    currentMonth: number,
}>
    = function (props) {

        let months: number[] = [];
        for (let i = props.currentMonth; i <= 12; i++) months.push(i);
        for (let i = 1; i < props.currentMonth; i++) months.push(i);
        
        let yearInputOptions: number[] = [];
        let currentYear = (new Date()).getFullYear();
        for (let i = currentYear; i >= 2000; i--) yearInputOptions[currentYear - i] = i;

        let [month, changeMonth] = useState(props.currentMonth);
        let [year, changeYear] = useState(currentYear);
        let [budget, changeBudget] = useState('');
        useEffect(() => changeMonth(props.currentMonth), [props.currentMonth])

        function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            let numBudget = parseInt(budget)
            props.onSubmit({
                month, year, budget: numBudget,
            });
            props.close();
        }

        return <div className={"center-form-bg" + (props.active ? "" : " invisible")}>
            <form id="budgetFormDialog" className="center-form dp04" onSubmit={handleSubmit}>
                <div className="d-flex jc-between ai-center mb-4">
                    <h5>Add Budget</h5>
                    <FontAwesomeIcon icon={faTimes} className="icon lg" onClick={e => props.close()}></FontAwesomeIcon>
                </div>
                <div>
                    <label htmlFor="budget-month" className="mr-3">Month</label>
                    <select name="budget-month" id="budget-month" className="mb-3" required
                        value={month} onChange={e => changeMonth(parseInt(e.target.value))}>
                        {
                            months.map(k => {
                                return <option value={k} key={months.indexOf(k)}>{monthMap[k]}</option>
                            })
                        }
                    </select>
                </div>
                <div className="d-flex jc-between">
                    <label htmlFor="budget-year" className="mr-3">Year</label>
                    <select name="budget-year" id="budget-year" className="mb-3" required
                        value={year} onChange={e => changeYear(parseInt(e.target.value))}>
                        {
                            yearInputOptions.map(o => {
                                return <option value={o} key={o}>{o}</option>
                            })
                        }
                    </select>
                </div>
                <input type="number" name="budget-amount" id="budget-amount" className="mb-3"
                    placeholder="Budget" value={budget} onChange={e => changeBudget(e.target.value)} required />
                <button className="btn as-center">Add</button>
            </form>
        </div>
    }

export default MonthBudgetForm;