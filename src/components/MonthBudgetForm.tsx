import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { monthlyBudgetType } from '../app/constants/Types';
import { HoverForm, InputMonth, InputYear } from './utility';

let MonthBudgetForm: React.FC<{
  active: boolean,
  close: () => void,
  onSubmit: (payload: monthlyBudgetType) => void,
  budget: monthlyBudgetType,
  mode?: 'create' | 'update'
}>
  = function (props) {
    let { budget } = props;
    let currentYear = (new Date()).getFullYear();

    let [month, changeMonth] = useState(budget.month);
    let [year, changeYear] = useState(budget.year || currentYear);
    let [amount, changeAmount] = useState(budget.amount ? budget.amount.toString() : '');

    useEffect(() => changeMonth(props.budget.month), [props.budget.month]);
    useEffect(() => changeYear(props.budget.year), [props.budget.year]);
    useEffect(() => changeAmount(budget.amount ? budget.amount.toString() : ''), [props.budget.amount]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      let numBudget = parseInt(amount)
      props.onSubmit({
        month, year, amount: numBudget,
      });
      props.close();
    }

    let modeText = 'Add';
    if (props.mode === 'update') modeText = 'Update';

    return <HoverForm active={props.active} submit={handleSubmit} close={props.close}>
      <div className="d-flex jc-between ai-center mb-4">
        <h5>{modeText} Budget</h5>
        <FontAwesomeIcon icon={faTimes} className="icon lg" onClick={e => props.close()}></FontAwesomeIcon>
      </div>
      {props.mode !== 'update'
        ? <div className="d-flex jc-between">
          <label htmlFor="budget-month" className="mr-3">Month</label>
          <InputMonth value={month} update={changeMonth} />
        </div>
        : null}
      {props.mode !== 'update'
        ? <div className="d-flex jc-between">
          <label htmlFor="budget-year" className="mr-3">Year</label>
          <InputYear value={year} update={changeYear} />
        </div>
        : null}
      <input type="number" name="budget-amount" id="budget-amount" className="mb-3"
        placeholder="Budget" value={amount} onChange={e => changeAmount(e.target.value)} required />
      <button className="btn as-center">{modeText}</button>
    </HoverForm>

  }

export default MonthBudgetForm;