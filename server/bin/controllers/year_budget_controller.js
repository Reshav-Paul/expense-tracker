"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.year_budget_update_by_id = exports.year_budget_get_all = exports.year_budget_get_by_id = exports.year_budget_create = exports.yearBudgetUpdationValidation = exports.yearBudgetCreationValidation = void 0;
const express_validator_1 = require("express-validator");
const customValidators_1 = require("../utilities/helpers/customValidators");
const YearBudget_1 = __importDefault(require("../models/YearBudget"));
const error_messages_1 = require("../utilities/error/error_messages");
exports.yearBudgetCreationValidation = [
    (0, express_validator_1.body)('year', error_messages_1.yearBudgetErrors.yearNotPresent).exists().notEmpty().trim(),
    (0, express_validator_1.body)('year', error_messages_1.yearBudgetErrors.invalidYear).optional({ checkFalsy: true }).custom(customValidators_1.yearValidator),
    (0, express_validator_1.body)('budget', error_messages_1.yearBudgetErrors.budgetNotPresent).exists().notEmpty().trim(),
    (0, express_validator_1.body)('budget', error_messages_1.yearBudgetErrors.invalidBudget).optional().isNumeric().custom(customValidators_1.budgetValidator),
    (0, express_validator_1.body)('userId', error_messages_1.yearBudgetErrors.userIdNotPresent).exists().notEmpty().trim(),
    (0, express_validator_1.body)('userId', error_messages_1.generalErrors.invalidMongoId).optional({ checkFalsy: true }).isMongoId(),
];
exports.yearBudgetUpdationValidation = [
    (0, express_validator_1.body)('year', error_messages_1.yearBudgetErrors.yearNotPresent).exists().notEmpty().trim(),
    (0, express_validator_1.body)('year', error_messages_1.yearBudgetErrors.invalidYear).optional({ checkFalsy: true }).custom(customValidators_1.yearValidator),
    (0, express_validator_1.body)('budget', error_messages_1.yearBudgetErrors.budgetNotPresent).exists().notEmpty().trim(),
    (0, express_validator_1.body)('budget', error_messages_1.yearBudgetErrors.invalidBudget).optional().isNumeric().custom(customValidators_1.budgetValidator),
];
let year_budget_create = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }
        try {
            let existingBudget = yield YearBudget_1.default.findOne({ year: req.body.year });
            if (existingBudget) {
                res.json({ message: error_messages_1.yearBudgetErrors.budgetExists });
                return;
            }
            let newYearBudgetData = {
                year: req.body.year,
                budget: req.body.budget,
                userId: req.body.userId,
            };
            let newYearBudget = new YearBudget_1.default(newYearBudgetData);
            let createdBudget = yield newYearBudget.save();
            let _a = createdBudget.toJSON(), { __v } = _a, returnBudget = __rest(_a, ["__v"]);
            res.json(returnBudget);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.year_budget_create = year_budget_create;
let year_budget_get_by_id = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let yearBudget = yield YearBudget_1.default.findById(req.params.id).lean();
            if (!yearBudget) {
                res.status(404).json({ error: error_messages_1.yearBudgetErrors.notFound });
            }
            else {
                if (yearBudget.userId.toString() !== req.user._id.toString()) {
                    res.status(401).send('Unauthorized');
                    return;
                }
                res.status(200).json(yearBudget);
            }
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.year_budget_get_by_id = year_budget_get_by_id;
let year_budget_get_all = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let queryOptions = {};
        if (req.query.year) {
            if (!(0, customValidators_1.isValidYear)(req.query.year)) {
                res.status(400).json({ error: error_messages_1.yearBudgetErrors.invalidYear });
                return;
            }
            queryOptions.year = req.query.year;
        }
        queryOptions.userId = req.user._id;
        try {
            let yearBudgets = yield YearBudget_1.default.find(queryOptions).lean();
            res.status(200).json(yearBudgets);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.year_budget_get_all = year_budget_get_all;
let year_budget_update_by_id = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let yearBudget = yield YearBudget_1.default.findById(req.params.id).lean();
            if (!yearBudget) {
                res.status(404).json({ error: error_messages_1.yearBudgetErrors.notFound });
            }
            else {
                if (yearBudget.userId.toString() !== req.user._id.toString()) {
                    res.status(401).send('Unauthorized');
                    return;
                }
            }
        }
        catch (err) {
            return next(err);
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }
        try {
            let updateData = {
                year: req.body.year,
                budget: req.body.budget,
            };
            let newBudget = yield YearBudget_1.default.findByIdAndUpdate(req.params.id, updateData);
            res.json(newBudget);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.year_budget_update_by_id = year_budget_update_by_id;
//# sourceMappingURL=year_budget_controller.js.map