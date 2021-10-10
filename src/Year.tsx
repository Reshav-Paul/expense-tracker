import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getYearBudgets } from './app/store';
import AnnualBudgetForm from './components/AnnualBudgetForm';
import Titlebar from './components/Titlebar';

let Year: React.FC<{}> = function (props) {
  let yearBudgets = useSelector(getYearBudgets);
  let [currentYear, changeCurrentYear] = useState(yearBudgets[0] ? yearBudgets[0].year : (new Date()).getFullYear());
  let [editForm, toggleEditForm] = useState(false);

  if (yearBudgets.length === 0) {
    return <div className="container-fluid h-100">
      <Titlebar title={'Annual'} />
      <AnnualMenuBar onClick={toggleEditForm} year={currentYear} />
      <div className="container-fluid h-80">
        <div className="d-flex flex-col jc-center ai-center h-100">
          <h4>No Annual Budget Added</h4>
        </div>
      </div>
      <AnnualBudgetForm close={() => toggleEditForm(false)} active={editForm}
        mode={'create'} onSubmit={() => { }} budget={{ year: 0, amount: 0 }} />
    </div>;
  }

  return <div className="container-fluid h-100">
    <Titlebar title={'Annual'} />
    <AnnualMenuBar onClick={toggleEditForm} year={currentYear} />
  </div>;
}

let AnnualMenuBar: React.FC<{
  onClick: (value: boolean) => void,
  year: number
}> = function (props) {
  return <div className="row ai-center">
    <div className="col-10 col-md-9 col-sm-8 text-left">
      <span>Current Year - {props.year}</span>
    </div>
    <div className="col-2 col-md-3 col-sm-4 text-right">
      <button className="btn" onClick={() => props.onClick(true)}>Add Budget</button>
    </div>
  </div>;
}

export default Year;