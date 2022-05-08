import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { stateType } from '../utilities/types';
import messageReducer from './reducers/messageReducer';
import uiLoadingReducer from './reducers/uiLoadingReducer';
import userProfileReducer from './reducers/userProfileReducer';

export const store = configureStore({
  reducer: combineReducers({
    userProfile: userProfileReducer,
    ui: uiLoadingReducer,
    message: messageReducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const getProfile = (state: stateType) => state.userProfile;
export const getUserID = (state: stateType) => state.userProfile.id;
export const getUserToken = (state: stateType) => state.userProfile.token;
export const isLoggedIn = (state: stateType) => state.userProfile.token && state.userProfile.token.length > 0;
export const getMessages = (state: stateType) => state.message.messages;

export const profileUI = (state: stateType) => state.ui.profile;
