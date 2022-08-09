import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"

export enum apiActionTypes {
  clear,
  request,
  success,
  failure,
};

// User Data from API
export type userProfileType = {
  id: string,
  firstname: string,
  lastname?: string,
  username: string,
  email: string,
  token: string,
}

export type yearBudgetType = {
  id: string,
  year: number,
  budget: number,
  userId: string,
}

export type userProfileTypeOptional = {
  id?: string,
  firstname?: string,
  lastname?: string,
  username?: string,
  email?: string,
  token?: string,
}

export type yearBudgetTypeOptional = {
  id?: string,
  year?: number,
  budget?: number,
  userId?: string,
}

export type userProfileUpdateType = {
  id: string,
  firstname?: string,
  lastname?: string,
}

export type yearBudgetUpdateType = {
  budget: number,
}

export type userProfileRegisterType = {
  firstname?: string,
  lastname?: string,
  username?: string,
  email: string,
  password: string | undefined,
}

export type yearBudgetCreateType = {
  year: number,
  budget: number,
  userId: string,
}

export type yearBudgetStateType = {
  budgets: yearBudgetType[],
  initialFetches: number,
}

// UI
export type uiLoadingStateType = {
  profile: apiActionTypes,
  yearBudget: apiActionTypes,
}
export type uiLoadingStateTypeOptional = {
  profile?: apiActionTypes,
  yearBudget?: apiActionTypes,
}

export enum messageClass {
  single, multiline, list
}

export enum messageTypes {
  success, error, warning
}

export type messageType = {
  id: string,
  class: messageClass,
  type: messageTypes,
  prefix: string,
  messages: string[],
  removed?: boolean,
}

export type messageTypeOptional = {
  id: string,
  class?: messageClass,
  prefix?: string,
  messages?: string[]
}

export type messageStateType = {
  messages: messageType[]
}

// main state
export type stateType = {
  userProfile: userProfileType,
  yearBudget: yearBudgetStateType,
  ui: uiLoadingStateType,
  message: messageStateType,
}

// redux
export enum uiLoadingClasses {
  profile, yearBudget
}
export type userProfileActionType = {
  type: string,
  payload: userProfileTypeOptional
}
export type yearBudgetActionType = {
  type: string,
  payload: yearBudgetType,
}
export type uiLoadingActionType = {
  type: string,
  payload: {
    type: uiLoadingClasses,
    state: apiActionTypes
  }
}
export type messageActionType = {
  type: string,
  payload?: messageTypeOptional
}
export type actionType = {
  type: string,
  payload: any,
}

// api

export type userApiResponseType = {
  code: number,
  data?: userProfileTypeOptional,
  errors?: string[],
}

export type yBApiResponseType = {
  code: number,
  data?: yearBudgetType,
  listData?: yearBudgetType[],
  errors?: string[],
}

export type rootThunkAction = ThunkAction<void, stateType, unknown, AnyAction>;