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

type budgetType = {
    year: number,
    month: number,
    amount: number,
}

type yearlyBudgetType = {
    year: number,
    budget: number,
}

type profileType = {
    firstName: string,
    lastName?: string,
    currentBudget: headerType,
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

type userStateType = {
    profile: profileType,
    budgets: budgetType[],
    yearlyBudgets: yearlyBudgetType[],
    expenses: expenseCollection[],
}
type stateType = {
    theme: themeType,
    budget: userStateType,
}

export type { 
    themeType, 
    headerType, expenseType, expenseCollection,
    budgetType, yearlyBudgetType,
    profileType, userStateType, stateType
};