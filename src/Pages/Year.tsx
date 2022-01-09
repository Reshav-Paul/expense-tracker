import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { yearlyBudgetType } from '../app/constants/Types';
import { addYearBudget, updateYearBudget } from '../app/reducers/yearBudgetReducer';
import { getLoginStatus, getYearBudgets } from '../app/store';
import AnnualBudgetForm from '../components/AnnualBudgetForm';
import Titlebar from '../components/Titlebar';
import { faChevronLeft, faChevronRight, faPen } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';

let Year: React.FC<{}> = function (props) {

  let yearBudgets = useSelector(getYearBudgets);
  let [currentYearIndex, changeCurrentYearIndex] = useState(yearBudgets.length > 0 ? 0 : -1);
  let [addForm, toggleAddForm] = useState(false);
  let [editForm, toggleEditForm] = useState(false);

  useEffect(() => {
    if (yearBudgets.length > 0 && currentYearIndex < 0) changeCurrentYearIndex(0);
    if (currentYearIndex >= yearBudgets.length) changeCurrentYearIndex(yearBudgets.length - 1);
  }, [currentYearIndex, yearBudgets]);

  let currentYear: number = currentYearIndex > 0 ? yearBudgets[currentYearIndex].year : (new Date()).getFullYear();
  const dispatch = useDispatch();

  function addNewBudget(payload: yearlyBudgetType) {
    let existingBudget = yearBudgets.filter(b => b.year === payload.year)[0];
    if (existingBudget) {
      let index = currentYearIndex;
      yearBudgets.some((b, i) => {
        if (b.year === payload.year) {
          index = i;
          return true;
        }
        return false;
      });
      changeCurrentYearIndex(index);
      return;
    }
    dispatch(addYearBudget(payload));
  }
  function updateBudget(payload: yearlyBudgetType) {
    let existingBudget = yearBudgets.filter(b => b.year === payload.year)[0];
    if (!existingBudget) {
      addNewBudget(payload);
      return;
    }
    dispatch(updateYearBudget(payload));
  }
  function incrementCurrentYear() {
    changeCurrentYearIndex((currentYearIndex + 1) % yearBudgets.length);
  }
  function decrementCurrentYear() {
    changeCurrentYearIndex(currentYearIndex === 0 ? yearBudgets.length - 1 : currentYearIndex - 1);
  }

  const isLoggedIn = useSelector(getLoginStatus);
  if (!isLoggedIn) {
    return <Redirect to={'/login'} />;
  }

  if (currentYearIndex < 0) {
    return <div className="container-fluid h-100">
      <Titlebar title={'Annual'} />
      <AnnualMenuBar onClickAdd={toggleAddForm} year={currentYear} amount={null} mode={'create'}
        increment={incrementCurrentYear} decrement={decrementCurrentYear} onClickUpdate={toggleEditForm} />
      <div className="container-fluid h-80">
        <div className="d-flex flex-col jc-center ai-center h-100">
          <h4>No Annual Budget Added</h4>
        </div>
      </div>
      <AnnualBudgetForm close={() => toggleAddForm(false)} active={addForm}
        mode={'create'} onSubmit={addNewBudget} budget={{ year: currentYear, amount: 0 }} />
    </div>;
  }

  let currentYearBudget = yearBudgets[currentYearIndex];

  return <div className="container-fluid h-100">
    <Titlebar title={'Annual'} />
    <AnnualMenuBar onClickAdd={toggleAddForm} year={currentYearBudget.year} amount={currentYearBudget.amount} mode={'update'}
      increment={incrementCurrentYear} decrement={decrementCurrentYear} onClickUpdate={toggleEditForm} />
    <AnnualBudgetForm close={() => toggleAddForm(false)} active={addForm}
      mode={'create'} onSubmit={addNewBudget} budget={{ year: currentYearBudget.year, amount: 0 }} />
    <AnnualBudgetForm close={() => toggleEditForm(false)} active={editForm}
      mode={'update'} onSubmit={updateBudget} budget={currentYearBudget} />
  </div>;
}

let AnnualMenuBar: React.FC<{
  onClickAdd: (value: boolean) => void,
  onClickUpdate: (value: boolean) => void,
  year: number,
  amount: number | null,
  mode: 'create' | 'update',
  increment: () => void,
  decrement: () => void,
}> = function (props) {

  return <div className="row ai-center">
    <div className="col-10 col-md-9 col-sm-8 text-left">
      <FontAwesomeIcon icon={faChevronLeft} className='icon' onClick={props.decrement} />
      <span className='px-3'>{props.year}</span>
      <FontAwesomeIcon icon={faChevronRight} className='icon' onClick={props.increment} />
      <span className="px-3">{props.amount !== null ? 'Budget - ₹ ' + props.amount : ''}</span>
      {
        props.mode === 'update' ?
          <button className="icon-btn ml-3" onClick={e => props.onClickUpdate(true)}>
            <FontAwesomeIcon className="icon" icon={faPen} />
            <span className="pl-2 d-sm-none">Update</span>
          </button>
          : null
      }
    </div>
    <div className="col-2 col-md-3 col-sm-4 text-right">
      <button className="btn" onClick={() => props.onClickAdd(true)}>Add Budget</button>
    </div>
  </div>;
}

export default Year;