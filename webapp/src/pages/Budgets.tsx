import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getYearBudgets } from "../app/store";
import Navbar from "../components/Navbar";
import YearBudgetToggle from "../components/YearBudgetToggle";
import InitialBudgetsPage from "./InitialBudgetsPage";

let Budgets: React.FC<{}> = function Budgets(props) {
  let [addFormVisible, setAddFormVisible] = useState(false);
  let yearBudgets = useSelector(getYearBudgets);
  if (yearBudgets.length === 0) return <InitialBudgetsPage />
  return <section id='budgets'>
    <Navbar />
    <div className="container-fluid">
      <YearBudgetToggle budgets={yearBudgets} onAddClick={() => setAddFormVisible(true)} />
    </div>
  </section>;
}

export default Budgets;