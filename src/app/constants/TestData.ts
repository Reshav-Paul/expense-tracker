import { expenseType, headerType, yearBudgetType } from './Types';

const recentExpenses: expenseType[] = [
    {
        id: '1',
        name: 'Apr Week 3 Groceries',
        amount: 580,
        date: '19.04.2021',
        month: '04',
        year: '2021',
    },
    {
        id: '2',
        name: 'Apr Week 4 Vegetables',
        amount: 450,
        date: '27.04.2021',
        month: '04',
        year: '2021',
    },
    {
        id: '3',
        name: 'May Week 1 Vegetables',
        amount: 370,
        date: '03.05.2021',
        month: '05',
        year: '2021',
    },

    {
        id: '4',
        name: 'May Week 1 Groceries',
        amount: 615,
        date: '03.05.2021',
        month: '05',
        year: '2021',
    },

    {
        id: '5',
        name: 'May Week 2 Vegetables',
        amount: 450,
        date: '10.05.2021',
        month: '05',
        year: '2021',
    },

    {
        id: '6',
        name: 'May Week 3 Groceries',
        amount: 580,
        date: '19.05.2021',
        month: '05',
        year: '2021',
    }
];

const headerData: headerType = {
    currentMonthBudget: 6000,
    currentYearBudget: 100000,
};

const yearBudget: yearBudgetType = {
    year: '2021',
    budgets: [
        {
            month: '04',
            budget: 6000,
        },
        {
            month: '05',
            budget: 6000,
        }
    ]
}

export { recentExpenses, headerData, yearBudget };