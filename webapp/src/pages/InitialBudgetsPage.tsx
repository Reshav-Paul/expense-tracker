import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import yearBudgetApi from "../api/yearBudgetApi";
import { updateLoadingFailure, updateLoadingStart, updateLoadingSuccess } from "../app/reducers/uiLoadingReducer";
import { addYearBudget, incrementYearBudgetFetches } from "../app/reducers/yearBudgetReducer";
import { getUserToken, getYearBudgetFetches, yearBudgetUI } from "../app/store";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import YearBudgetForm from "../components/YearBudgetForm";
import YearBudgetToggle from "../components/YearBudgetToggle";
import { apiActionTypes, rootThunkAction, uiLoadingClasses } from "../utilities/types";

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
            dispatch(updateLoadingSuccess(uiLoadingClasses.yearBudget));
        } else {
            dispatch(updateLoadingFailure(uiLoadingClasses.yearBudget));
        }
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

export default InitialBudgetsPage;