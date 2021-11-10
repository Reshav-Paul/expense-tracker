import { RequestHandler } from "express";
import { body, validationResult } from 'express-validator';

import { budgetValidator, yearValidator, isValidYear } from "../utilities/helpers/customValidators";
import { YearBudgetOptionalType, YearBudgetType } from "../utilities/types/types";
import YearBudget from "../models/YearBudget";
import { generalErrors, yearBudgetErrors } from '../utilities/error/error_messages';

export let yearBudgetCreationValidation = [
    body('year', yearBudgetErrors.yearNotPresent).exists().notEmpty().trim(),
    body('year', yearBudgetErrors.invalidYear).optional({ checkFalsy: true }).custom(yearValidator),
    body('budget', yearBudgetErrors.budgetNotPresent).exists().notEmpty().trim(),
    body('budget', yearBudgetErrors.invalidBudget).optional().isNumeric().custom(budgetValidator),
    body('userId', yearBudgetErrors.userIdNotPresent).exists().notEmpty().trim(),
    body('userId', generalErrors.invalidMongoId).optional({ checkFalsy: true }).isMongoId(),
];

export let yearBudgetUpdationValidation = [
    body('year', yearBudgetErrors.yearNotPresent).exists().notEmpty().trim(),
    body('year', yearBudgetErrors.invalidYear).optional({ checkFalsy: true }).custom(yearValidator),
    body('budget', yearBudgetErrors.budgetNotPresent).exists().notEmpty().trim(),
    body('budget', yearBudgetErrors.invalidBudget).optional().isNumeric().custom(budgetValidator),
];

export let year_budget_create: RequestHandler = async function (req: any, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            error: { status: 'Validation_Error', errors: errors.array() }
        });
        return;
    }

    try {
        let existingBudget = await YearBudget.findOne({ year: req.body.year });
        if (existingBudget) {
            res.json({ message: yearBudgetErrors.budgetExists });
            return;
        }

        let newYearBudgetData: YearBudgetType = {
            year: req.body.year,
            budget: req.body.budget,
            userId: req.body.userId,
        }

        let newYearBudget = new YearBudget(newYearBudgetData);
        let createdBudget = await newYearBudget.save();
        let { __v, ...returnBudget } = createdBudget.toJSON();
        res.json(returnBudget);
    } catch (err) {
        return next(err);
    }
}

export let year_budget_get_by_id: RequestHandler = async function (req: any, res, next) {
    try {
        let yearBudget = await YearBudget.findById(req.params.id).lean();
        if (!yearBudget) {
            res.status(404).json({ error: yearBudgetErrors.notFound });
        } else {
            if (yearBudget.userId.toString() !== req.user._id.toString()) {
                res.status(401).send('Unauthorized');
                return;
            }
            res.status(200).json(yearBudget);
        }
    } catch (err) {
        return next(err);
    }
}

export let year_budget_get_all: RequestHandler = async function (req: any, res, next) {
    let queryOptions: YearBudgetOptionalType = {};
    if (req.query.year) {
        if (!isValidYear(req.query.year)) {
            res.status(400).json({ error: yearBudgetErrors.invalidYear });
            return;
        }
        queryOptions.year = req.query.year;
    }
    queryOptions.userId = req.user._id;

    try {
        let yearBudgets = await YearBudget.find(queryOptions).lean();
        res.status(200).json(yearBudgets);
    } catch (err) {
        return next(err);
    }
}

export let year_budget_update_by_id: RequestHandler = async function (req: any, res, next) {
    try {
        let yearBudget = await YearBudget.findById(req.params.id).lean();
        if (!yearBudget) {
            res.status(404).json({ error: yearBudgetErrors.notFound });
        } else {
            if (yearBudget.userId.toString() !== req.user._id.toString()) {
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
        let updateData: YearBudgetOptionalType = {
            year: req.body.year,
            budget: req.body.budget,
        };

        let newBudget = await YearBudget.findByIdAndUpdate(req.params.id, updateData);
        res.json(newBudget);
    } catch (err) {
        return next(err);
    }
}