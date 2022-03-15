import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export enum apiActionTypes {
  clear,
  request,
  success,
  failure,
};

type themeType = {
  key: string,
  label: string,
  prColor: string,
  secColor: string,
  fontPrColor: string,
  fontSecColor: string
};

type monthlyBudgetType = {
  year: number,
  month: number,
  amount: number,
}

type yearlyBudgetType = {
  year: number,
  amount: number,
  id: string,
}

type profileType = {
  userId: string,
  firstname: string,
  lastname?: string,
  username: string,
  email: string,
  currentTheme: themeType,
  authToken: string,
  updatingStatus: apiActionTypes,
  yBudgetUpdatingStatus: apiActionTypes,
  yBudgetLoadingStatus: apiActionTypes,
}
type profilePayloadType = {
  userId?: string,
  firstname?: string,
  lastname?: string,
  username?: string,
  email?: string,
  password?: string,
}
type optionalProfileType = {
  userId?: string,
  firstname?: string,
  lastname?: string,
  username?: string,
  email?: string,
  currentTheme?: themeType,
  authToken?: string,
  updatingStatus?: apiActionTypes,
}
type expenseType = {
  id: string,
  date: string,
  amount: number,
  name: string,
}

type expenseCollection = {
  month: number,
  year: number,
  expenses: expenseType[],
}

type stateType = {
  profile: profileType,
  yearBudgets: yearlyBudgetType[],
  monthBudgets: monthlyBudgetType[],
  expenses: expenseCollection[],
}

export type {
  themeType, yearlyBudgetType, monthlyBudgetType,
  expenseType, expenseCollection,
  profileType, stateType, optionalProfileType,
  profilePayloadType
};

export type actionType = {
  type: string,
  payload: any,
}

export type chartColorScheme = {
  accent1: string,
  accent2: string,
  accent3: string,
  accent4: string,
  accent5: string,
  accent6: string,
  accent7: string
}

export type userApiResponseType = {
  code: number,
  data?: optionalProfileType,
  error?: string[],
}

export type yBudgetApiResponseType = {
  code: number,
  data?: yearlyBudgetType[],
  error?: string[],
}

export type rootThunkAction = ThunkAction<void, stateType, unknown, AnyAction>;