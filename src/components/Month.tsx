import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBudget, getBudgetState, getBudget, getYears } from '../app/reducers/stateReducer';

import MonthBudgetForm from './MonthBudgetForm';
import { budgetType } from '../app/constants/Types';
import { monthMap, monthArray } from '../app/constants/utilityData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import ThemePopup from './ThemePopup';
import THEMES from '../app/constants/Themes';

let Month: React.FC<{}> = function (props) {
  const dispatch = useDispatch();
  const state = useSelector(getBudgetState);

  let [month, changeMonth] = useState(1);
  let [year, changeYear] = useState((new Date()).getFullYear());
  let [form, showForm] = useState(false);

  let closeForm = () => showForm(false);

  function submitForm(payload: budgetType) {
    dispatch(addBudget(payload));
  }

  let monthlyBudget = getBudget(state, month, year);
  let yearsInData = getYears(state);
  
  return <div className="container-fluid h-100">
    <div className="row">
      <h3 className="hc-text col-10">Month</h3>
      <ThemePopup themes={THEMES} />
    </div>
    <section className="container-fluid">
      <div className="row">
        <div className="col-10 col-md-9 col-sm-8 g-0">
          <span className="mr-2 d-inline-block" style={{ width: '124px' }}>{monthMap[month] + ", " + year}</span>
          <span className="has-dropdown">
            <button className="icon-btn p-0">
              <FontAwesomeIcon className="icon lg" icon={faCog} />
            </button>
            <HoverBudgetSwitch years={yearsInData} selectedYear={year} selectedMonth={month}
              changeYear={changeYear} changeMonth={changeMonth} />
          </span>
        </div>
        <div className="col-2 col-md-3 col-sm-4 text-right g-0">
          <button className="btn" onClick={e => showForm(true)}>Add Budget</button>
        </div>
      </div>
    </section>
    <MonthMain budget={monthlyBudget} />
    <MonthBudgetForm active={form} close={closeForm} onSubmit={submitForm} currentMonth={month} />
  </div>;
}

let MonthMain: React.FC<{
  budget: budgetType | null,
}> = function (props) {
  const { budget } = props;
  if (!budget) return <section className="h-80">
    <div className="h-100 d-flex jc-center ai-center">
      <h3>No Budget Added</h3>
    </div>
  </section>;

  return <section className="col-12">
    {budget.budget}
  </section>
}

let HoverBudgetSwitch: React.FC<{
  years: number[],
  selectedYear: number,
  selectedMonth: number,
  changeYear: (newYear: number) => void,
  changeMonth: (newMonth: number) => void,
}> = function (props) {
  return <div className="container dropdown drp-md center-aligned dp08" style={{ width: '400px' }}>
    <button className="hover-container p-0 m-0 d-block">
      <div className="row">
        <div className="col-3 g-0 dp02">
          { props.years.length === 0
          ? <div className="h-100 d-flex jc-center ai-center">
              <span className="hc-text">No Data</span>
            </div>
          : props.years.map(y =>
            <li className={(props.selectedYear === y ? 'btn' : 'py-2') + ' li-none m-0 font-sm hc-text text-center'} key={y}
              onClick={e => props.changeYear(y)} >
              {y}
            </li>)}
        </div>
        <div className="col-9 g-0">
          <div className="container">
            <div className="row">
              {
                monthArray.map(m => m.key !== props.selectedMonth
                  ? <span key={m.key} onClick={e => props.changeMonth(m.key)}
                    className="col-3 g-0 mx-2 my-3 cursor-pointer hc-text font-sm">{m.val}</span>
                  : <span key={m.key} onClick={e => props.changeMonth(m.key)}
                    className="col-3 g-0 mx-2 my-3 cursor-pointer icon font-sm">{m.val}</span>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>
}

export default Month;