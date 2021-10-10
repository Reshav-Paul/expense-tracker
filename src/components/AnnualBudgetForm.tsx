import React, { useEffect, useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { yearlyBudgetType } from '../app/constants/Types';
import { HoverForm, InputYear } from '../components/utility';

let AnnualBudgetForm: React.FC<{
  active: boolean,
  close: () => void,
  onSubmit: (payload: yearlyBudgetType) => void,
  budget: yearlyBudgetType,
  mode?: 'create' | 'update'
}> = function (props) {

  let { budget } = props;
  let currentYear = (new Date()).getFullYear();

  let [year, changeYear] = useState(budget.year || currentYear);
  let [amount, changeAmount] = useState(budget.amount ? budget.amount.toString() : '');

  useEffect(() => changeYear(props.budget.year), [props.budget.year]);
  useEffect(() => changeAmount(props.budget.amount ? props.budget.amount.toString() : ''), [props.budget.amount]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let numBudget = parseInt(amount)
    props.onSubmit({
      year, amount: numBudget,
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
        <label htmlFor="budget-year" className="mr-3">Year</label>
        <InputYear value={year} update={changeYear} />
      </div>
      : null}
    <input type="number" name="budget-amount" id="budget-amount" className="mb-3"
      placeholder="Budget" value={amount} onChange={e => changeAmount(e.target.value)} required />
    <button className="btn as-center">{modeText}</button>
  </HoverForm>
}

export default AnnualBudgetForm;