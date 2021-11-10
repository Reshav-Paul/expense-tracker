import { CustomValidator } from "express-validator";
import validator from "validator";
import { yearBudgetErrors, monthBudgetErrors } from "../error/error_messages";

export let validateMongoId = function validateMongoId(id: string) {
    return validator.isMongoId(id);
}

export let isValidMonth = function isValidMonth(input: any) {
    let month: number;
    try {
        if (typeof input === 'number') month = input;
        else month = parseInt(input);
        if (month >= 1 && month <= 12) return true;
    } catch (err) { }
    return false;
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

export let monthValidator: CustomValidator = function (input, meta) {
    try {
        if (isValidMonth(input)) return true;
        else throw new Error(monthBudgetErrors.invalidMonth);
    } catch (error) {
        throw new Error(monthBudgetErrors.invalidMonth);
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