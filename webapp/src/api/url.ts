
const apiUrlBase = 'http://127.0.0.1:3000';

export const apiUrl = {
  base: () => apiUrlBase,
  user: {
    base: () => apiUrlBase + '/users',
    login: () => apiUrlBase + '/users/login',
    logout: () => apiUrlBase + '/users/logout',
    signup: () => apiUrlBase + '/users/signup',
    me: () => apiUrlBase + '/users/me',
    byId: (id: string) => apiUrlBase + '/users/' + id,
  },
  yearBudget: {
    create: () => apiUrlBase + '/budgets/year',
    readList: () => apiUrlBase + '/budgets/year',
    readById: (id: string) => apiUrlBase + '/budgets/year/' + id,
    update: (id: string) => apiUrlBase + '/budgets/year/' + id,
  }
}