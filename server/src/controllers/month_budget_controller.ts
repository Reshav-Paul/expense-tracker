import { RequestHandler } from "express";
import { body, validationResult } from 'express-validator';

import { budgetValidator, yearValidator, isValidYear } from "../utilities/helpers/customValidators";
import { MonthBudgetOptionalType, MonthBudgetType } from "../utilities/types/types";
import MonthBudget from "../models/MonthBudget";
import { generalErrors, monthBudgetErrors } from '../utilities/error/error_messages';

export let month_budget_get_by_id: RequestHandler = async function (req: any, res, next) {
    try {
        let monthBudget = await MonthBudget.findById(req.params.id).lean();
        if (!monthBudget) {
            res.status(404).json({ error: monthBudgetErrors.budgetNotPresent });
            return;
        }
        if (monthBudget.userId.toString() !== req.user._id.toString()) {
            res.status(401).send('Unauthorized');
            return;
        }
        res.json(monthBudget);
    } catch (err) {
        return next(err);
    }
}

export let month_budget_get: RequestHandler = async function (req: any, res, next) {
    try {
        let query: MonthBudgetOptionalType = {};
        if (req.query.year) {
            if (!isValidYear(req.query.year)) {
                res.status(400).json({ error: monthBudgetErrors.invalidYear });
                return;
            }
            query.year = req.query.year;
        }
        if (req.query.month) query.month = req.query.month;
        query.userId = req.user._id;

        let monthBudgets = await MonthBudget.find(query).lean();
        if (monthBudgets.length === 0) {
            res.status(404).json({ error: monthBudgetErrors.budgetNotPresent });
            return;
        }
        res.json(monthBudgets);
    } catch (err) {
        return next(err);
    }
}