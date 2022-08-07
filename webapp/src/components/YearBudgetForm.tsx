import { useDispatch, useSelector } from "react-redux";

import { getUserID, getUserToken } from "../app/store";
import { messageClass, messageType, messageTypes, rootThunkAction, uiLoadingClasses, yearBudgetCreateType, yearBudgetTypeOptional } from "../utilities/types";
import HoverForm from "../components/HoverForm";
import { updateLoadingFailure, updateLoadingStart, updateLoadingSuccess } from "../app/reducers/uiLoadingReducer";
import yearBudgetApi from "../api/yearBudgetApi";
import { addYearBudget } from "../app/reducers/yearBudgetReducer";
import { getSuccessMessage, mapNetworkErrorsToUIErrors } from "../utilities/errorHandlingUtilities";
import { addMessage, markMessageRemoval, removeMessage } from "../app/reducers/messageReducer";

let YearBudgetForm: React.FC<{
  budget: yearBudgetTypeOptional,
  action: 'add' | 'update',
  active: boolean,
  close: () => void
}> = function YearBudgetForm(props) {
  let token = useSelector(getUserToken);
  let userId = useSelector(getUserID);
  const dispatch = useDispatch();

  if (!props.active) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let data = new FormData(e.target as HTMLFormElement);
    let year = parseInt(data.get('year')?.toString() || '0');
    let budget = parseInt(data.get('budget')?.toString() || '0');

    if (props.action === 'add') {
      dispatch(createYearBudget({ year, budget, userId }));
    } else if (props.action === 'update') {

    }
  }

  let createYearBudget = (payload: yearBudgetCreateType): rootThunkAction => async dispatch => {
    dispatch(updateLoadingStart(uiLoadingClasses.yearBudget));
    let res = await yearBudgetApi.yearBudgetCreate(payload, token);

    if (res?.data && res?.data.id) {
      dispatch(addYearBudget(res.data));
      dispatch(updateLoadingSuccess(uiLoadingClasses.yearBudget));
      let successMsg = getSuccessMessage('Budget Added!');
      dispatch(addMessage(successMsg));
      setTimeout(() => {
        dispatch(markMessageRemoval(successMsg.id));
      }, 3000);
      setTimeout(() => {
        dispatch(removeMessage(successMsg.id));
      }, 3100);
      return;

    } else if (res?.errors) {
      let errors = res?.errors;
      if (errors) {
        let errorMsg: messageType = mapNetworkErrorsToUIErrors(
          messageTypes.error,
          errors,
          {
            msgClass: messageClass.multiline,
            prefix: 'Updation Error - ',
            defaultMessage: 'Could not update Profile',
          }
        );
        dispatch(addMessage(errorMsg));
        setTimeout(() => {
          dispatch(markMessageRemoval(errorMsg.id));
        }, 6000);
        setTimeout(() => {
          dispatch(removeMessage(errorMsg.id));
        }, 6100);
      }
      dispatch(updateLoadingFailure(uiLoadingClasses.profile));
    }
  }

  return <HoverForm close={props.close} onSubmit={handleSubmit}>
    <input type="number" name="year" placeholder="Year" className="mt-2 mb-3" />
    <input type="number" name="budget" placeholder="Budget" />
    <div className="d-flex jc-center ai-center mt-3">
      <button className="bg-sec fc-secondary m-0">Submit</button>
    </div>

  </HoverForm>;
}

export default YearBudgetForm;