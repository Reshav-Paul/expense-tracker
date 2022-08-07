import { createReducer, updateObject } from "../../utilities/stateHandlerUtilities";
import { apiActionTypes, uiLoadingActionType, uiLoadingClasses, uiLoadingStateType, uiLoadingStateTypeOptional } from "../../utilities/types";


const loadingInitialState: uiLoadingStateType = {
  profile: apiActionTypes.clear,
  yearBudget: apiActionTypes.clear,
}

function updateLoadingHandler(state: uiLoadingStateType, action: uiLoadingActionType) {
  if (action.payload.type === uiLoadingClasses.profile) {
    state = updateObject(state, { profile: action.payload.state } as uiLoadingStateTypeOptional);
  }
  if (action.payload.type === uiLoadingClasses.yearBudget) {
    state = updateObject(state, { yearBudget: action.payload.state } as uiLoadingStateTypeOptional)
  }
  return state;
}

const uiLoadingReducer = createReducer(loadingInitialState, {
  'ui': updateLoadingHandler,
})

export default uiLoadingReducer;

export function updateLoadingStart(payload: uiLoadingClasses) {
  let action: uiLoadingActionType = {
    type: 'ui',
    payload: {
      type: payload,
      state: apiActionTypes.request
    }
  }
  return action;
}

export function updateLoadingSuccess(payload: uiLoadingClasses) {
  let action: uiLoadingActionType = {
    type: 'ui',
    payload: {
      type: payload,
      state: apiActionTypes.success
    }
  }
  return action;
}

export function updateLoadingFailure(payload: uiLoadingClasses) {
  let action: uiLoadingActionType = {
    type: 'ui',
    payload: {
      type: payload,
      state: apiActionTypes.failure
    }
  }
  return action;
}