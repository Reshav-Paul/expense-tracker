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

function updateUserUpdateRequestStatus(state: profileType, action: actionType) {
  state = updateObject(state, action.payload as optionalProfileType);
  // console.log(action.payload);
  return state;
}

const profileReducer = createReducer(userInitialState, {
  'profile/update': updatePersonalInfo,
  'profile/theme/update': updateTheme,
  'profile/update/request': updateUserUpdateRequestStatus,
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

