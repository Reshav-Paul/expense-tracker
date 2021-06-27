import { expenseType, headerType } from './Types';

const recentExpenses: expenseType[] = [
    {
        id: '1',
        name: 'Apr Week 3 Groceries',
        amount: 580,
        date: new Date(2021, 4, 19),
        month: '04',
        year: '2021',
    },
    {
        id: '2',
        name: 'Apr Week 4 Vegetables',
        amount: 450,
        date: new Date(2021, 4, 27),
        month: '04',
        year: '2021',
    },
    {
        id: '3',
        name: 'May Week 1 Vegetables',
        amount: 370,
        date: new Date(2021, 5, 3),
        month: '05',
        year: '2021',
    },

    {
        id: '4',
        name: 'May Week 1 Groceries',
        amount: 615,
        date: new Date(2021, 5, 3),
        month: '05',
        year: '2021',
    },

    {
        id: '5',
        name: 'May Week 2 Vegetables',
        amount: 450,
        date: new Date(2021, 5, 10),
        month: '05',
        year: '2021',
    },

    {
        id: '6',
        name: 'May Week 3 Groceries',
        amount: 580,
        date: new Date(2021, 5, 19),
        month: '05',
        year: '2021',
    }
];

const headerData: headerType = {
    currentMonthBudget: 6000,
    currentYearBudget: 100000,
};

export { recentExpenses, headerData };