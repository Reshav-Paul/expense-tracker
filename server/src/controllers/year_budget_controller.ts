import { RequestHandler } from "express";
import { body, validationResult } from 'express-validator';

import { budgetValidator, validateYear } from "../utilities/helpers/customValidators";
import { YearBudgetOptionalType, YearBudgetType } from "types";
import YearBudget from "../models/YearBudget";
import { generalErrors, yearBudgetErrors } from '../utilities/error/error_messages';

export let yearBudgetCreationValidation = [
    body('year', yearBudgetErrors.yearNotPresent).exists().notEmpty().trim(),
    body('year', yearBudgetErrors.invalidYear).optional({ checkFalsy: true }).custom(validateYear),
    body('budget', yearBudgetErrors.budgetNotPresent).exists().notEmpty().trim(),
    body('budget', yearBudgetErrors.invalidBudget).optional().isNumeric().custom(budgetValidator),
    body('userId', yearBudgetErrors.userIdNotPresent).exists().notEmpty().trim(),
    body('userId', generalErrors.invalidMongoId).optional({ checkFalsy: true }).isMongoId(),
];

export let year_budget_create: RequestHandler = async function (req: any, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            error: { status: 'Validation_Error', errors: errors.array() }
        });
        return;
    }

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
    try {
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
            if (yearBudget.userId !== req.user._id) {
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
    if (req.query.year) queryOptions.year = req.query.year;
    queryOptions.userId = req.user._id;

    try {
        let yearBudgets = await YearBudget.find(queryOptions).lean();
        res.status(200).json(yearBudgets);
    } catch (err) {
        return next(err);
    }
}
