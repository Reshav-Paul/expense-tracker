"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthBudgetErrors = exports.yearBudgetErrors = exports.generalErrors = exports.userErrors = void 0;
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
    notFound: 'No Budget Found for this Month',
    yearNotPresent: 'Year is mandatory',
    budgetNotPresent: 'Budget is mandatory',
    monthNotPresent: 'Month is mandatory',
    invalidYear: 'This year is not valid',
    invalidBudget: 'This budget is not valid',
    invalidMonth: 'This month is not valid. Months 1-12 are valid',
    userIdNotPresent: 'User ID is mandatory',
    budgetExists: 'Budget has already been created',
};
//# sourceMappingURL=error_messages.js.map