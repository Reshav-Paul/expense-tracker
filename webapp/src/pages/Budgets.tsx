import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { getUserToken, getYearBudgetFetches, getYearBudgets, yearBudgetUI } from "../app/store";
import Navbar from "../components/Navbar";
import IconButton from "../components/IconButton";
import YearBudgetForm from "../components/YearBudgetForm";
import { apiActionTypes, rootThunkAction, uiLoadingClasses, yearBudgetType } from "../utilities/types";
import Loading from "../components/Loading";
import yearBudgetApi from "../api/yearBudgetApi";
import { updateLoadingFailure, updateLoadingStart } from "../app/reducers/uiLoadingReducer";
import { addYearBudget, incrementYearBudgetFetches } from "../app/reducers/yearBudgetReducer";

let Budgets: React.FC<{}> = function Budgets(props) {
  let yearBudgets = useSelector(getYearBudgets);
  if (yearBudgets.length === 0) return <InitialBudgetsPage />
  return <section id='budgets'>
    <Navbar />
  </section>;
}

let InitialBudgetsPage: React.FC<{}> = function InitialBudgetsPage(props) {
  let [addFormVisible, setAddFormVisible] = useState(false);
  let yearBudgetFetches = useSelector(getYearBudgetFetches);
  let yearBudgetUIState = useSelector(yearBudgetUI);
  let token = useSelector(getUserToken);
  const dispatch = useDispatch();

  let getAllYearBudgets = (): rootThunkAction => async dispatch => {
    dispatch(updateLoadingStart(uiLoadingClasses.yearBudget));
    let res = await yearBudgetApi.getAllYearBudgets(token);
    if (res.code === 200 && res.listData) {
      res.listData.forEach(budget => dispatch(addYearBudget(budget)));
    }
    dispatch(updateLoadingFailure(uiLoadingClasses.yearBudget));
  }

  if (yearBudgetFetches < 3 && yearBudgetUIState !== apiActionTypes.request) {
    dispatch(incrementYearBudgetFetches());
    dispatch(getAllYearBudgets());
  }

  if (yearBudgetUIState === apiActionTypes.request) {
    return <section id='budgets' className="h-100">
      <Navbar />
      <div className="container-fluid">
        <Loading overlay={true} />
      </div>
    </section>;
  }

  return <section id='budgets'>
    <Navbar />
    <div className="container-fluid">
      <YearBudgetToggle budgets={[]} onAddClick={() => setAddFormVisible(true)} />
      <YearBudgetForm active={addFormVisible} action="add" close={() => setAddFormVisible(false)}
        budget={{ id: undefined, year: undefined, budget: undefined, userId: undefined }} />
    </div>
  </section>;
}

let YearBudgetToggle: React.FC<{
  budgets: yearBudgetType[],
  onAddClick: () => void
}> = function YearBudgetToggle(props) {
  if (props.budgets.length === 0) {
    return <div className="year-toggle">
      <IconButton icon={faPlus} btnText={'Add Year Budget'} iconPosition={'left'} onClick={e => props.onAddClick()} elevated />
    </div>;
  }
  return <div className="year-toggle"></div>
}

export default Budgets;