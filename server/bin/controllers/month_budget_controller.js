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
exports.month_budget_update_by_id = exports.month_budget_get_all = exports.month_budget_get_by_id = exports.month_budget_create = exports.monthBudgetUpdationValidation = exports.monthBudgetCreationValidation = void 0;
const express_validator_1 = require("express-validator");
const customValidators_1 = require("../utilities/helpers/customValidators");
const MonthBudget_1 = __importDefault(require("../models/MonthBudget"));
const error_messages_1 = require("../utilities/error/error_messages");
const YearBudget_1 = __importDefault(require("../models/YearBudget"));
exports.monthBudgetCreationValidation = [
    (0, express_validator_1.body)('year', error_messages_1.monthBudgetErrors.yearNotPresent).exists().bail().notEmpty().trim(),
    (0, express_validator_1.body)('year', error_messages_1.monthBudgetErrors.invalidYear).optional().custom(customValidators_1.yearValidator),
    (0, express_validator_1.body)('month', error_messages_1.monthBudgetErrors.monthNotPresent).exists().bail().notEmpty().trim(),
    (0, express_validator_1.body)('month', error_messages_1.monthBudgetErrors.invalidMonth).optional({ checkFalsy: true }).custom(customValidators_1.monthValidator),
    (0, express_validator_1.body)('budget', error_messages_1.monthBudgetErrors.budgetNotPresent).exists().bail().notEmpty().trim(),
    (0, express_validator_1.body)('budget', error_messages_1.monthBudgetErrors.invalidBudget).optional().isNumeric().custom(customValidators_1.budgetValidator),
    (0, express_validator_1.body)('userId', error_messages_1.monthBudgetErrors.userIdNotPresent).exists().bail().notEmpty().trim(),
    (0, express_validator_1.body)('userId', error_messages_1.generalErrors.invalidMongoId).optional({ checkFalsy: true }).isMongoId(),
];
exports.monthBudgetUpdationValidation = [
    (0, express_validator_1.body)('budget', error_messages_1.monthBudgetErrors.budgetNotPresent).exists().bail().notEmpty().trim(),
    (0, express_validator_1.body)('budget', error_messages_1.monthBudgetErrors.invalidBudget).optional().isNumeric().custom(customValidators_1.budgetValidator),
];
let month_budget_create = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }
        try {
            let yearBudget = yield YearBudget_1.default.findOne({ year: req.body.year }).lean();
            if (!yearBudget) {
                res.json({ message: error_messages_1.monthBudgetErrors.noYearBudgetExists });
                return;
            }
            let existingBudget = yield MonthBudget_1.default.findOne({
                year: req.body.year,
                month: req.body.month,
            });
            if (existingBudget) {
                res.json({ message: error_messages_1.monthBudgetErrors.budgetExists });
                return;
            }
            let newMonthBudgetData = {
                year: req.body.year,
                month: req.body.month,
                budget: req.body.budget,
                userId: req.body.userId,
            };
            let newMonthBudget = new MonthBudget_1.default(newMonthBudgetData);
            let createdBudget = yield newMonthBudget.save();
            let _a = createdBudget.toJSON(), { __v } = _a, returnBudget = __rest(_a, ["__v"]);
            res.json(returnBudget);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.month_budget_create = month_budget_create;
let month_budget_get_by_id = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let monthBudget = yield MonthBudget_1.default.findById(req.params.id).lean();
            if (!monthBudget) {
                res.status(404).json({ error: error_messages_1.monthBudgetErrors.budgetNotPresent });
                return;
            }
            if (monthBudget.userId.toString() !== req.user._id.toString()) {
                res.status(401).send('Unauthorized');
                return;
            }
            res.json(monthBudget);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.month_budget_get_by_id = month_budget_get_by_id;
let month_budget_get_all = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = {};
            if (req.query.year) {
                if (!(0, customValidators_1.isValidYear)(req.query.year)) {
                    res.status(400).json({ error: error_messages_1.monthBudgetErrors.invalidYear });
                    return;
                }
                query.year = req.query.year;
            }
            if (req.query.month) {
                if (!(0, customValidators_1.isValidMonth)(req.query.month)) {
                    res.status(400).json({ error: error_messages_1.monthBudgetErrors.invalidMonth });
                    return;
                }
                query.month = req.query.month;
            }
            query.userId = req.user._id;
            let monthBudgets = yield MonthBudget_1.default.find(query).lean();
            res.json(monthBudgets);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.month_budget_get_all = month_budget_get_all;
let month_budget_update_by_id = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let monthBudget = yield MonthBudget_1.default.findById(req.params.id).lean();
            if (!monthBudget) {
                res.status(404).json({ error: error_messages_1.monthBudgetErrors.notFound });
            }
            else {
                if (monthBudget.userId.toString() !== req.user._id.toString()) {
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
                budget: req.body.budget,
            };
            let newBudget = yield MonthBudget_1.default.findByIdAndUpdate(req.params.id, updateData);
            res.json(newBudget);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.month_budget_update_by_id = month_budget_update_by_id;
//# sourceMappingURL=month_budget_controller.js.map