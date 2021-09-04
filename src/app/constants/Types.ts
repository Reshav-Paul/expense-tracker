type themeType = {
  key: string,
  label: string,
  prColor: string,
  secColor: string,
  fontPrColor: string,
  fontSecColor: string
};

type headerType = {
  currentYearBudget?: number,
  currentMonthBudget?: number,
}

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
  currentBudget: headerType,
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
  headerType, expenseType, expenseCollection,
  profileType, stateType
};

export type actionType = {
  type: string,
  payload: any,
}