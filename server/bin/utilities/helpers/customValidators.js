"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetValidator = exports.monthValidator = exports.yearValidator = exports.isValidYear = exports.isValidMonth = exports.validateMongoId = void 0;
const validator_1 = __importDefault(require("validator"));
const error_messages_1 = require("../error/error_messages");
let validateMongoId = function validateMongoId(id) {
    return validator_1.default.isMongoId(id);
};
exports.validateMongoId = validateMongoId;
let isValidMonth = function isValidMonth(input) {
    let month;
    try {
        if (typeof input === 'number')
            month = input;
        else
            month = parseInt(input);
        if (month >= 1 && month <= 12)
            return true;
    }
    catch (err) { }
    return false;
};
exports.isValidMonth = isValidMonth;
let isValidYear = function isValidYear(input) {
    let year;
    try {
        if (typeof input === 'number')
            year = input;
        else
            year = parseInt(input);
        if (year > 1900 && year < 9999)
            return true;
    }
    catch (err) { }
    return false;
};
exports.isValidYear = isValidYear;
let yearValidator = function (input, meta) {
    try {
        if ((0, exports.isValidYear)(input))
            return true;
        else
            throw new Error(error_messages_1.yearBudgetErrors.invalidYear);
    }
    catch (error) {
        throw new Error(error_messages_1.yearBudgetErrors.invalidYear);
    }
};
exports.yearValidator = yearValidator;
let monthValidator = function (input, meta) {
    try {
        if ((0, exports.isValidMonth)(input))
            return true;
        else
            throw new Error(error_messages_1.monthBudgetErrors.invalidMonth);
    }
    catch (error) {
        throw new Error(error_messages_1.monthBudgetErrors.invalidMonth);
    }
};
exports.monthValidator = monthValidator;
let budgetValidator = function (input, meta) {
    let budget;
    try {
        if (typeof input === 'number')
            budget = input;
        else
            budget = parseInt(input);
        if (budget >= 0)
            return true;
        else
            throw new Error(error_messages_1.yearBudgetErrors.invalidBudget);
    }
    catch (error) {
        throw new Error(error_messages_1.yearBudgetErrors.invalidBudget);
    }
};
exports.budgetValidator = budgetValidator;
//# sourceMappingURL=customValidators.js.map