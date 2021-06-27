type themeType = {
    key: string,
    label: string,
    prColor: string,
    secColor: string,
    fontPrColor: string,
    fontSecColor: string
};

type expenseType = {
    id: string,
    name: string,
    date: Date,
    amount: number,
    month: string,
    year: string,
};

type headerType = {
    currentYearBudget?: number,
    currentMonthBudget?: number,
}

type budgetType = {
    year: number,
    month: number,
    budget: number,
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

type stateType = {
    profile: profileType,
    budgets: budgetType[],
    yearlyBudgets: yearlyBudgetType[]
}

export type { 
    themeType, 
    expenseType, headerType,
    budgetType, yearlyBudgetType,
    profileType, stateType
};