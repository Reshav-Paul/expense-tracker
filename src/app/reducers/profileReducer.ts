import THEMES from '../constants/Themes';
import { actionType, headerType, profileType, themeType } from '../constants/Types';
import { createReducer, updateObject } from './stateHandlerUtilities';

const initialState: profileType = {
  firstName: '',
  lastName: '',
  username: '',
  currentBudget: { currentMonthBudget: 0, currentYearBudget: 0 },
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

function updateCurrentBudget(state: profileType, action: actionType) {
  let newCurrBudget: headerType = action.payload;

  if (newCurrBudget.currentMonthBudget &&
    newCurrBudget.currentMonthBudget >= 0) {
    state.currentBudget.currentMonthBudget = newCurrBudget.currentMonthBudget;
  }

  if (newCurrBudget.currentYearBudget &&
    newCurrBudget.currentYearBudget >= 0) {
    state.currentBudget.currentYearBudget = newCurrBudget.currentYearBudget;
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
  'profile/budget/update': updateCurrentBudget,
  'profile/theme/update': updateTheme,
});

export default profileReducer;

// action createors
export function changeTheme(payload: string) {
  return { type: 'profile/theme/update', payload }
}