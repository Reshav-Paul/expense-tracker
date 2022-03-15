import THEMES from '../constants/Themes';
import { actionType, apiActionTypes, optionalProfileType, profileType } from '../constants/Types';
import { createReducer, updateObject } from './stateHandlerUtilities';

export const userInitialState: profileType = {
  userId: '',
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  currentTheme: THEMES.DARK_NIGHTS,
  authToken: '',
  updatingStatus: apiActionTypes.clear,
  yBudgetUpdatingStatus: apiActionTypes.clear,
  yBudgetLoadingStatus: apiActionTypes.clear,
}

function updatePersonalInfo(state: profileType, action: actionType) {
  state = updateObject(state, action.payload as optionalProfileType);
  return state;
}

function updateTheme(state: profileType, action: actionType) {
  if (THEMES[action.payload]) {
    state = updateObject(state, { currentTheme: THEMES[action.payload] });
  }
  return state;
}

function updateUserRequestStatus(state: profileType, action: actionType) {
  state = updateObject(state, action.payload as optionalProfileType);
  return state;
}

function updateYearBudgetRequestStatus(state: profileType, action: actionType) {
  state = updateObject(state, action.payload as optionalProfileType);
  return state;
}

const profileReducer = createReducer(userInitialState, {
  'profile/update': updatePersonalInfo,
  'profile/theme/update': updateTheme,
  'profile/update/request': updateUserRequestStatus,
  'budget/year/update/request': updateYearBudgetRequestStatus
});

export default profileReducer;

// action createors
export function changeTheme(payload: string) {
  return { type: 'profile/theme/update', payload }
}
export function updateUser(payload: optionalProfileType) {
  return { type: 'profile/update', payload }
}

export function setUserUpdateStart() {
  return { type: 'profile/update/request', payload: { updatingStatus: apiActionTypes.request } };
}

export function setUserUpdateSuccess() {
  return { type: 'profile/update/request', payload: { updatingStatus: apiActionTypes.success } };
}

export function setUserUpdateFailure() {
  return { type: 'profile/update/request', payload: { updatingStatus: apiActionTypes.failure } };
}

export function setYearBudgetUpdateStart() {
  return { type: 'budget/year/update/request', payload: { yBudgetUpdatingStatus: apiActionTypes.request } };
}

export function setYearBudgetUpdateSuccess() {
  return { type: 'budget/year/update/request', payload: { yBudgetUpdatingStatus: apiActionTypes.success } };
}

export function setYearBudgetUpdateFailure() {
  return { type: 'budget/year/update/request', payload: { yBudgetUpdatingStatus: apiActionTypes.failure } };
}

export function setYearBudgetLoadingStart() {
  return { type: 'budget/year/update/request', payload: { yBudgetLoadingStatus: apiActionTypes.request } };
}

export function setYearBudgetLoadingSuccess() {
  return { type: 'budget/year/update/request', payload: { yBudgetLoadingStatus: apiActionTypes.success } };
}

export function setYearBudgetLoadingFailure() {
  return { type: 'budget/year/update/request', payload: { yBudgetLoadingStatus: apiActionTypes.failure } };
}