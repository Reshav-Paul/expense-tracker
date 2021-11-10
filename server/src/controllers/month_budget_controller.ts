import { RequestHandler } from "express";
import { body, validationResult } from 'express-validator';

import { budgetValidator, yearValidator, isValidYear, isValidMonth, monthValidator } from "../utilities/helpers/customValidators";
import { MonthBudgetOptionalType, MonthBudgetType } from "../utilities/types/types";
import MonthBudget from "../models/MonthBudget";
import { generalErrors, monthBudgetErrors } from '../utilities/error/error_messages';
import YearBudget from "../models/YearBudget";

export let monthBudgetCreationValidation = [
    body('year', monthBudgetErrors.yearNotPresent).exists().bail().notEmpty().trim(),
    body('year', monthBudgetErrors.invalidYear).optional().custom(yearValidator),
    body('month', monthBudgetErrors.monthNotPresent).exists().bail().notEmpty().trim(),
    body('month', monthBudgetErrors.invalidMonth).optional({ checkFalsy: true }).custom(monthValidator),
    body('budget', monthBudgetErrors.budgetNotPresent).exists().bail().notEmpty().trim(),
    body('budget', monthBudgetErrors.invalidBudget).optional().isNumeric().custom(budgetValidator),
    body('userId', monthBudgetErrors.userIdNotPresent).exists().bail().notEmpty().trim(),
    body('userId', generalErrors.invalidMongoId).optional({ checkFalsy: true }).isMongoId(),
];

export let monthBudgetUpdationValidation = [
    body('budget', monthBudgetErrors.budgetNotPresent).exists().bail().notEmpty().trim(),
    body('budget', monthBudgetErrors.invalidBudget).optional().isNumeric().custom(budgetValidator),
];

export let month_budget_create: RequestHandler = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            error: { status: 'Validation_Error', errors: errors.array() }
        });
        return;
    }

    try {
        let yearBudget = await YearBudget.findOne({ year: req.body.year }).lean();
        if (!yearBudget) {
            res.json({ message: monthBudgetErrors.noYearBudgetExists });
            return;
        }

        let existingBudget = await MonthBudget.findOne({
            year: req.body.year,
            month: req.body.month,
        });
        if (existingBudget) {
            res.json({ message: monthBudgetErrors.budgetExists });
            return;
        }

        let newMonthBudgetData: MonthBudgetType = {
            year: req.body.year,
            month: req.body.month,
            budget: req.body.budget,
            userId: req.body.userId,
        }

        let newMonthBudget = new MonthBudget(newMonthBudgetData);
        let createdBudget = await newMonthBudget.save();
        let { __v, ...returnBudget } = createdBudget.toJSON();
        res.json(returnBudget);
    } catch (err) {
        return next(err);
    }
}

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

export let month_budget_get_all: RequestHandler = async function (req: any, res, next) {
    try {
        let query: MonthBudgetOptionalType = {};
        if (req.query.year) {
            if (!isValidYear(req.query.year)) {
                res.status(400).json({ error: monthBudgetErrors.invalidYear });
                return;
            }
            query.year = req.query.year;
        }
        if (req.query.month) {
            if (!isValidMonth(req.query.month)) {
                res.status(400).json({ error: monthBudgetErrors.invalidMonth });
                return;
            }
            query.month = req.query.month;
        }
        query.userId = req.user._id;

        let monthBudgets = await MonthBudget.find(query).lean();
        res.json(monthBudgets);
    } catch (err) {
        return next(err);
    }
}

export let month_budget_update_by_id: RequestHandler = async function (req: any, res, next) {
    try {
        let monthBudget = await MonthBudget.findById(req.params.id).lean();
        if (!monthBudget) {
            res.status(404).json({ error: monthBudgetErrors.notFound });
        } else {
            if (monthBudget.userId.toString() !== req.user._id.toString()) {
                res.status(401).send('Unauthorized');
                return;
            }
        }
    } catch (err) {
        return next(err);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            error: { status: 'Validation_Error', errors: errors.array() }
        });
        return;
    }

    try {
        let updateData: MonthBudgetOptionalType = {
            year: req.body.year,
            month: req.body.month,
            budget: req.body.budget,
        };

        let newBudget = await MonthBudget.findByIdAndUpdate(req.params.id, updateData);
        res.json(newBudget);
    } catch (err) {
        return next(err);
    }
}