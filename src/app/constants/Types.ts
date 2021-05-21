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
    date: string,
    amount: number,
    month: string,
    year: string,
};

type headerType = {
    currentYearBudget: number,
    currentMonthBudget: number,
}

type monthBudgetType = {
    month: string,
    budget: number,
}

type yearBudgetType = {
    year: string,
    budgets: monthBudgetType[],
}

export type { 
    themeType, 
    expenseType, headerType,
    monthBudgetType, yearBudgetType,
};