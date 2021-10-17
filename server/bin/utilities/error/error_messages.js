"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalErrors = exports.userErrors = void 0;
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
//# sourceMappingURL=error_messages.js.map