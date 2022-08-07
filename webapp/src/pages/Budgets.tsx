import React, { useState } from "react";
import { useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { getYearBudgetFetches, getYearBudgets, yearBudgetUI } from "../app/store";
import Navbar from "../components/Navbar";
import IconButton from "../components/IconButton";
import YearBudgetForm from "../components/YearBudgetForm";
import { apiActionTypes, yearBudgetType } from "../utilities/types";
import Loading from "../components/Loading";

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
  if (yearBudgetFetches < 3 && yearBudgetUIState !== apiActionTypes.request) {

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