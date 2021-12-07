"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseErrors = exports.monthBudgetErrors = exports.yearBudgetErrors = exports.generalErrors = exports.userErrors = void 0;
exports.userErrors = {
    duplicateEmail: 'Email already signed up',
    noFirstname: 'First Name is required',
    invalidFirstname: 'First Name must be strictly alphabetic',
    noLastname: 'Last Name is required',
    invalidLastname: 'Last Name must be strictly alphabetic',
    noUsername: 'Username is required',
    noEmail: 'Email is required',
    invalidEmail: 'Invalid Email',
    noPassword: 'Password is required',
    loginDefaultError: 'An Error Occured during Login! Please try Again.',
    wrongPassword: 'Wrong Password',
    noUserFound: 'User not Found. Try signing up',
};
exports.generalErrors = {
    invalidMongoId: 'Invalid ID',
};
exports.yearBudgetErrors = {
    notFound: 'No Budget Found for this Year',
    yearNotPresent: 'Year is mandatory',
    budgetNotPresent: 'Budget is mandatory',
    invalidYear: 'This year is not valid',
    invalidBudget: 'This budget is not valid',
    userIdNotPresent: 'User ID is mandatory',
    budgetExists: 'Budget has already been created',
};
exports.monthBudgetErrors = {
    notFound: 'No Budget Found',
    yearNotPresent: 'Year is mandatory',
    budgetNotPresent: 'Budget is mandatory',
    monthNotPresent: 'Month is mandatory',
    invalidYear: 'This year is not valid',
    invalidBudget: 'This budget is not valid',
    invalidMonth: 'This month is not valid. Months 1-12 are valid',
    userIdNotPresent: 'User ID is mandatory',
    budgetExists: 'Budget has already been created',
    noYearBudgetExists: 'Month Budget requires a year Budget to be created First',
};
exports.expenseErrors = {
    notFound: 'No Expenses Found',
    nameNotPresent: 'Name is mandatory',
    amountNotPresent: 'Amount is mandatory',
    dateNotPresent: 'Date is mandatory',
    userIdNotPresent: 'User ID is mandatory',
    invalidAmount: 'This amount is not valid',
    invalidDate: 'Invalid Date Format. Please use format YYYY-MM-DD',
    noMonthBudgetExists: 'Expenses requires a Month Budget to be created First',
};
//# sourceMappingURL=error_messages.js.map