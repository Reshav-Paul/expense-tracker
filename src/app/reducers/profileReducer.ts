import THEMES from '../constants/Themes';
import { actionType, profileType } from '../constants/Types';
import { createReducer, updateObject } from './stateHandlerUtilities';

const initialState: profileType = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  currentTheme: THEMES.DARK_NIGHTS,
}

function updatePersonalInfo(state: profileType, action: actionType) {
  if (action.payload.firstName) {
    state.firstName = action.payload.firstName;
  }
  if (action.payload.lastName) {
    state.lastName = action.payload.lastName;
  }

  return state;
}

function updateTheme(state: profileType, action: actionType) {
  console.log(action.payload);
  if (THEMES[action.payload]) {
    state = updateObject(state, { currentTheme: THEMES[action.payload] });
  }
  return state;
}

const profileReducer = createReducer(initialState, {
  'profile/personal/update': updatePersonalInfo,
  'profile/theme/update': updateTheme,
});

export default profileReducer;

// action createors
export function changeTheme(payload: string) {
  return { type: 'profile/theme/update', payload }
}