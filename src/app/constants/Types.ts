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
}

type profileType = {
  firstName: string,
  lastName?: string,
  username: string,
  email: string,
  currentTheme: themeType,
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
  profileType, stateType
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