"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetValidator = exports.yearValidator = exports.isValidYear = exports.validateMongoId = void 0;
const validator_1 = __importDefault(require("validator"));
const error_messages_1 = require("../error/error_messages");
let validateMongoId = function validateMongoId(id) {
    return validator_1.default.isMongoId(id);
};
exports.validateMongoId = validateMongoId;
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