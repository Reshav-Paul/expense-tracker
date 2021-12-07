import { RequestHandler } from "express";
import { body, validationResult } from 'express-validator';

import Expense from "../models/Expense";
import MonthBudget from "../models/MonthBudget";
import { budgetValidator } from "../utilities/helpers/customValidators";
import { ExpenseOptionalType, ExpenseType } from "../utilities/types/types";
import { generalErrors, expenseErrors } from '../utilities/error/error_messages';
import { createValidationError, createNotFoundError, createUnauthorizedError } from '../utilities/error/error_response';

export let expenseCreationValidation = [
    body('name', expenseErrors.nameNotPresent).exists().bail().notEmpty().trim(),
    body('date', expenseErrors.dateNotPresent).exists().bail().notEmpty().trim(),
    body('date', expenseErrors.invalidDate).optional({ checkFalsy: true }).isDate(),
    body('amount', expenseErrors.amountNotPresent).exists().bail().notEmpty(),
    body('amount', expenseErrors.invalidAmount).optional({ checkFalsy: true }).custom(budgetValidator),
    body('userId', expenseErrors.userIdNotPresent).exists().bail().notEmpty().trim(),
    body('userId', generalErrors.invalidMongoId).optional({ checkFalsy: true }).isMongoId(),
];

export let expenseUpdationValidation = [
    body('name', expenseErrors.nameNotPresent).optional({ checkFalsy: true }).trim().notEmpty(),
    body('date', expenseErrors.invalidDate).optional({ checkFalsy: true }).isDate(),
    body('amount', expenseErrors.amountNotPresent).optional({ checkFalsy: true }).custom(budgetValidator),
    body('userId', expenseErrors.userIdNotPresent).exists().bail().notEmpty().trim(),
    body('userId', generalErrors.invalidMongoId).optional({ checkFalsy: true }).isMongoId(),
];

export let expense_create: RequestHandler = async function (req: any, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(createValidationError(errors.array()));
        return;
    }

    let expenseDate = new Date(req.body.date);
    let month = expenseDate.getMonth() + 1;
    let year = expenseDate.getFullYear();

    try {
        let monthBudget = await MonthBudget.findOne({ month: month, year: year }).lean();
        if (!monthBudget || monthBudget.budget <= 0) {
            res.status(400).json(createNotFoundError(expenseErrors.noMonthBudgetExists))
            return;
        }

        let expenseData: ExpenseType = {
            name: req.body.name,
            date: req.body.date,
            amount: req.body.amount,
            userId: req.user._id
        };
        let newExpense = new Expense(expenseData);
        let createdExpense = await newExpense.save();
        let { __v, ...returnExpense } = createdExpense.toJSON();

        res.json(returnExpense);
    } catch (err) {
        return next(err);
    }
}

export let expense_get_by_id: RequestHandler = async function (req: any, res, next) {
    try {
        let expense = await Expense.findById(req.params.id);
        if (!expense) {
            res.status(404).json(createNotFoundError(expenseErrors.notFound));
            return;
        } else if (expense.userId.toString() !== req.user._id.toString()) {
            res.status(401).send(createUnauthorizedError());
            return;
        }
        res.json(expense);
    } catch (err) {
        return next(err);
    }
}

export let expense_get_all: RequestHandler = async function (req: any, res, next) {
    try {
        let query: ExpenseOptionalType = {};
        if (req.query.date) query.date = req.query.date;
        if (req.query.name) query.name = req.query.name;
        query.userId = req.user._id;

        let expenses = await Expense.find(query).lean();
        res.json(expenses);
    } catch (err) {
        return next(err);
    }
}

export let expense_update_by_id: RequestHandler = async function (req: any, res, next) {
    try {
        let existingExpense = await Expense.findById(req.params.id).lean();
        if (!existingExpense) {
            res.status(404).json(createNotFoundError(expenseErrors.notFound));
            return;
        } else {
            if (existingExpense.userId.toString() !== req.user._id.toString()) {
                res.status(401).send(createUnauthorizedError());
                return;
            }
        }
    } catch (err) {
        return next(err);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(createValidationError(errors.array()));
        return;
    }
    let expenseUpdateData: ExpenseOptionalType = {};

    let expenseDate: Date, month: number, year: number;
    if (req.body.date) {
        try {
            expenseDate = new Date(req.body.date);
            month = expenseDate.getMonth() + 1;
            year = expenseDate.getFullYear();
            expenseUpdateData.date = req.body.date;
            let monthBudget = await MonthBudget.findOne({ month: month, year: year }).lean();
            if (!monthBudget || monthBudget.budget <= 0) {
                res.status(400).json(createNotFoundError(expenseErrors.noMonthBudgetExists));
                return;
            }
        } catch (err) {
            return next(err);
        }

    }

    try {
        if (req.body.name) expenseUpdateData.name = req.body.name;
        if (req.body.amount) expenseUpdateData.amount = req.body.amount;

        let updatedExpense = await Expense.findByIdAndUpdate(req.params.id, expenseUpdateData);
        res.json(updatedExpense);
    } catch (err) {
        return next(err);
    }

}