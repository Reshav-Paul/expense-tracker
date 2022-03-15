import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios, { AxiosError } from "axios";
import { faChevronLeft, faChevronRight, faPen } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';

import { apiActionTypes, yearlyBudgetType } from '../app/constants/Types';
import { addYearBudget, addYearBudgets, updateYearBudget } from '../app/reducers/yearBudgetReducer';
import { getLoginStatus, getUserID, getUserToken, getYBudgetLoadingStatus, getYearBudgets } from '../app/store';
import AnnualBudgetForm from '../components/AnnualBudgetForm';
import Titlebar from '../components/Titlebar';
import { setYearBudgetLoadingFailure, setYearBudgetLoadingStart, setYearBudgetLoadingSuccess, setYearBudgetUpdateFailure, setYearBudgetUpdateStart, setYearBudgetUpdateSuccess } from '../app/reducers/profileReducer';
import userApiHelper from '../apiHelpers/userApiHelper';
import { apiErrorFormatter } from '../apiHelpers/responseFormatters';
import Loading from '../components/Loading';

let Year: React.FC<{}> = function (props) {

  let yearBudgets = useSelector(getYearBudgets);
  let userID = useSelector(getUserID);
  let userToken = useSelector(getUserToken);
  let yBudgetLoading = useSelector(getYBudgetLoadingStatus);
  let [currentYearIndex, changeCurrentYearIndex] = useState(yearBudgets.length > 0 ? 0 : -1);
  let [addForm, toggleAddForm] = useState(false);
  let [editForm, toggleEditForm] = useState(false);
  let currentYear: number = currentYearIndex > 0 ? yearBudgets[currentYearIndex].year : (new Date()).getFullYear();
  const dispatch = useDispatch();

  useEffect(() => {
    if (yearBudgets.length > 0 && currentYearIndex < 0) changeCurrentYearIndex(0);
    if (currentYearIndex >= yearBudgets.length) changeCurrentYearIndex(yearBudgets.length - 1);
    if (yearBudgets.length === 0) fetchAllYearBudgetData();
  }, [currentYearIndex, yearBudgets, userToken]);

  async function addNewBudget(payload: yearlyBudgetType) {
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

    dispatch(setYearBudgetUpdateStart());
    try {
      let res = await userApiHelper.yearBudget.addBudget(payload, userID, userToken)
      if (res?.error && res.error.length > 0) {
        dispatch(setYearBudgetUpdateFailure());
        return;
      }
      if (res?.data && res?.data[0].year === payload.year) {
        dispatch(addYearBudget(payload));
      } else {
        dispatch(setYearBudgetUpdateFailure());
        return;
      }
      dispatch(setYearBudgetUpdateSuccess());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        let errorResponse = apiErrorFormatter(axiosError);
        console.log(errorResponse);
      }
      dispatch(setYearBudgetUpdateFailure());
    }
  }

  async function fetchAllYearBudgetData() {
    if (userToken) {
      dispatch(setYearBudgetLoadingStart());
      try {
        let res = await userApiHelper.yearBudget.getAll(userID, userToken)
        if (res?.error && res.error.length > 0) {
          dispatch(setYearBudgetLoadingFailure());
          return;
        }
        if (res?.data && res?.data[0].year) {
          console.log(res.data);
          dispatch(addYearBudgets(res.data));
        } else {
          dispatch(setYearBudgetLoadingFailure());
          return;
        }
        dispatch(setYearBudgetLoadingSuccess());
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log(axiosError.response?.data);
        }
        dispatch(setYearBudgetLoadingFailure());
      }
    };
  }

  async function updateBudget(payload: yearlyBudgetType) {
    let existingBudget = yearBudgets.filter(b => b.year === payload.year)[0];
    if (!existingBudget) {
      addNewBudget(payload);
      return;
    }
    dispatch(setYearBudgetUpdateStart());
    try {
      let res = await userApiHelper.yearBudget.updateBudget(payload, userID, userToken)
      if (res?.error && res.error.length > 0) {
        dispatch(setYearBudgetUpdateFailure());
        return;
      }
      if (res?.data && res?.data[0].year === payload.year) {
        dispatch(updateYearBudget(payload));
      } else {
        dispatch(setYearBudgetUpdateFailure());
        return;
      }
      dispatch(setYearBudgetUpdateSuccess());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        let errorResponse = apiErrorFormatter(axiosError);
        console.log(errorResponse);
      }
      dispatch(setYearBudgetUpdateFailure());
    }
  }
  function incrementCurrentYear() {
    if (currentYearIndex < 0) return;
    changeCurrentYearIndex((currentYearIndex + 1) % yearBudgets.length);
  }
  function decrementCurrentYear() {
    if (currentYearIndex < 0) return;
    changeCurrentYearIndex(currentYearIndex === 0 ? yearBudgets.length - 1 : currentYearIndex - 1);
  }

  const isLoggedIn = useSelector(getLoginStatus);
  if (!isLoggedIn) {
    return <Redirect to={'/login'} />;
  }

  if (currentYearIndex < 0) {
    return <div className="container-fluid h-100">
      <Titlebar title={'Annual'} />
      <AnnualMenuBar onClickAdd={toggleAddForm} year={-1} amount={null} mode={'create'}
        increment={incrementCurrentYear} decrement={decrementCurrentYear} onClickUpdate={toggleEditForm} />
      <div className="container-fluid h-80">
        <div className="d-flex flex-col jc-center ai-center h-100">
          {yBudgetLoading === apiActionTypes.request ? <Loading /> : <h4>No Annual Budget Added</h4>}
        </div>
      </div>
      <AnnualBudgetForm close={() => toggleAddForm(false)} active={addForm}
        mode={'create'} onSubmit={addNewBudget} budget={{ year: currentYear, amount: 0, id: '' }} />
    </div>;
  }

  let currentYearBudget = yearBudgets[currentYearIndex];

  return <div className="container-fluid h-100">
    <Titlebar title={'Annual'} />
    {
      yBudgetLoading === apiActionTypes.request
        ? <div className="container-fluid h-80">
          <div className="d-flex flex-col jc-center ai-center h-100">
            <Loading />
          </div>
        </div>
        : <AnnualMenuBar onClickAdd={toggleAddForm} year={currentYearBudget.year} amount={currentYearBudget.amount} mode={'update'}
          increment={incrementCurrentYear} decrement={decrementCurrentYear} onClickUpdate={toggleEditForm} />
    }
    <AnnualBudgetForm close={() => toggleAddForm(false)} active={addForm}
      mode={'create'} onSubmit={addNewBudget} budget={{ year: currentYearBudget.year, amount: 0, id: '' }} />
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

  function getYearSwitcher() {
    if (props.year < 0) return null;
    return <span>
      <FontAwesomeIcon icon={faChevronLeft} className='icon' onClick={props.decrement} />
      <span className='px-3'>{props.year}</span>
      <FontAwesomeIcon icon={faChevronRight} className='icon' onClick={props.increment} />
    </span>;
  }

  return <div className="row ai-center">
    <div className="col-10 col-md-9 col-sm-8 text-left">
      {getYearSwitcher()}
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