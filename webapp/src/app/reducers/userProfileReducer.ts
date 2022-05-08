import { createReducer, updateObject } from "../../utilities/stateHandlerUtilities";
import { userProfileActionType, userProfileType, userProfileTypeOptional } from "../../utilities/types";

export const profileInitialState: userProfileType = {
  id: '',
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  token: '',
}

function updateProfileHandler(state: userProfileType, action: userProfileActionType) {
  state = updateObject(state, action.payload as userProfileTypeOptional);
  return state;
}

const userProfileReducer = createReducer(profileInitialState, {
  'profile/update': updateProfileHandler,
});

export default userProfileReducer;

// action creators
export function updateUser(payload: userProfileTypeOptional) {
  return { type: 'profile/update', payload }
}