import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

let Month: React.FC<{}> = function (props) {
    let [form, showForm] = useState(false);

    let closeForm = (e: React.MouseEvent<SVGSVGElement>) => showForm(false);

    return <section className="container-fluid">
        <div className="row">
            <div className="col text-right">
                <button className="btn" onClick={e => showForm(true)}>Add Budget</button>
            </div>
        </div>
        <MonthBudgetForm active={form} close={closeForm} />
    </section>;
}

let MonthBudgetForm: React.FC<{
    active: boolean,
    close: (e: React.MouseEvent<SVGSVGElement>) => void
}>
    = function (props) {
        let monthInputOptions = [
            { text: 'January', value: '1' },
            { text: 'February', value: '2' },
            { text: 'March', value: '3' },
            { text: 'April', value: '4' },
            { text: 'May', value: '5' },
            { text: 'June', value: '6' },
            { text: 'July', value: '7' },
            { text: 'August', value: '8' },
            { text: 'September', value: '9' },
            { text: 'October', value: '10' },
            { text: 'November', value: '11' },
            { text: 'December', value: '12' },
        ];

        let yearInputOptions: number[] = [];
        let currentYear = (new Date()).getFullYear();
        for (let i = currentYear; i >= 2000; i--) yearInputOptions[currentYear - i] = i;

        return <div className={"center-form-bg" + (props.active ? "" : " invisible")}>
            <form id="budgetFormDialog" className="center-form dp04">
                <div className="d-flex jc-between ai-center mb-4">
                    <h5>Add Budget</h5>
                    <FontAwesomeIcon icon={faTimes} className="icon lg" onClick={props.close}></FontAwesomeIcon>
                </div>
                <div>
                    <label htmlFor="budget-month" className="mr-3">Month</label>
                    <select name="budget-month" id="budget-month" className="mb-3">
                        {
                            monthInputOptions.map(o => {
                                return <option value={o.value} key={o.value}>{o.text}</option>
                            })
                        }
                    </select>
                </div>
                <div className="d-flex jc-between">
                    <label htmlFor="budget-year" className="mr-3">Year</label>
                    <select name="budget-year" id="budget-year" className="mb-3">
                        {
                            yearInputOptions.map(o => {
                                return <option value={o} key={o}>{o}</option>
                            })
                        }
                    </select>
                </div>
                <button className="btn as-center">Add</button>
            </form>
        </div>
    }

export default Month;