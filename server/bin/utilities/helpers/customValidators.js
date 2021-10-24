"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetValidator = exports.validateYear = exports.validateMongoId = void 0;
const validator_1 = __importDefault(require("validator"));
const error_messages_1 = require("../error/error_messages");
let validateMongoId = function validateMongoId(id) {
    return validator_1.default.isMongoId(id);
};
exports.validateMongoId = validateMongoId;
let validateYear = function (input, meta) {
    let year;
    try {
        if (typeof input === 'number')
            year = input;
        else
            year = parseInt(input);
        if (year > 1900 && year < 9999)
            return true;
        else
            throw new Error(error_messages_1.yearBudgetErrors.invalidYear);
    }
    catch (error) {
        throw new Error(error_messages_1.yearBudgetErrors.invalidYear);
    }
};
exports.validateYear = validateYear;
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