import { CustomValidator } from "express-validator";
import validator from "validator";
import { yearBudgetErrors } from "../error/error_messages";

export let validateMongoId = function validateMongoId(id: string) {
    return validator.isMongoId(id);
}

export let isValidYear = function isValidYear(input: any) {
    let year: number;
    try {
        if (typeof input === 'number') year = input;
        else year = parseInt(input);
        if (year > 1900 && year < 9999) return true;
    } catch (err) { }
    return false;
}

export let yearValidator: CustomValidator = function (input, meta) {
    try {
        if (isValidYear(input)) return true;
        else throw new Error(yearBudgetErrors.invalidYear);
    } catch (error) {
        throw new Error(yearBudgetErrors.invalidYear);
    }
}

export let budgetValidator: CustomValidator = function (input, meta) {
    let budget: number;
    try {
        if (typeof input === 'number') budget = input;
        else budget = parseInt(input);
        if (budget >= 0) return true;
        else throw new Error(yearBudgetErrors.invalidBudget);
    } catch (error) {
        throw new Error(yearBudgetErrors.invalidBudget);
    }
}