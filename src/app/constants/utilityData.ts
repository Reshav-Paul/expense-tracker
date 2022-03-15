export const monthMap: { [key: number]: string } = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'Decemeber'
}

export const monthArray: { key: number, val: string }[] = [
    { key: 1, val: 'January', },
    { key: 2, val: 'February', },
    { key: 3, val: 'March', },
    { key: 4, val: 'April', },
    { key: 5, val: 'May', },
    { key: 6, val: 'June', },
    { key: 7, val: 'July', },
    { key: 8, val: 'August', },
    { key: 9, val: 'September', },
    { key: 10, val: 'October', },
    { key: 11, val: 'November', },
    { key: 12, val: 'Decemeber' },
]

const apiUrlBase = 'http://127.0.0.1:3000';

export const apiUrl = {
    base: () => apiUrlBase,
    user: {
        base: () => apiUrlBase + '/users',
        login: () => apiUrlBase + '/users/login',
        logout: () => apiUrlBase + '/users/logout',
        signup: () => apiUrlBase + '/users/signup',
        me: () => apiUrlBase + '/users/me',
        getId: (id: string) => apiUrlBase + '/users/' + id,
    },
    yearBudget: {
        create: () => apiUrlBase + '/budgets/year',
        readList: () => apiUrlBase + '/budgets/year',
        readById: (id: string) => apiUrlBase + '/budgets/year/' + id,
        update: (id: string) => apiUrlBase + '/budgets/year/' + id,
    }
}