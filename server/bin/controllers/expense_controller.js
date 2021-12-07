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
exports.expense_update_by_id = exports.expense_get_all = exports.expense_get_by_id = exports.expense_create = exports.expenseUpdationValidation = exports.expenseCreationValidation = void 0;
const express_validator_1 = require("express-validator");
const Expense_1 = __importDefault(require("../models/Expense"));
const MonthBudget_1 = __importDefault(require("../models/MonthBudget"));
const customValidators_1 = require("../utilities/helpers/customValidators");
const error_messages_1 = require("../utilities/error/error_messages");
exports.expenseCreationValidation = [
    (0, express_validator_1.body)('name', error_messages_1.expenseErrors.nameNotPresent).exists().bail().notEmpty().trim(),
    (0, express_validator_1.body)('date', error_messages_1.expenseErrors.dateNotPresent).exists().bail().notEmpty().trim(),
    (0, express_validator_1.body)('date', error_messages_1.expenseErrors.invalidDate).optional({ checkFalsy: true }).isDate(),
    (0, express_validator_1.body)('amount', error_messages_1.expenseErrors.amountNotPresent).exists().bail().notEmpty(),
    (0, express_validator_1.body)('amount', error_messages_1.expenseErrors.invalidAmount).optional({ checkFalsy: true }).custom(customValidators_1.budgetValidator),
    (0, express_validator_1.body)('userId', error_messages_1.expenseErrors.userIdNotPresent).exists().bail().notEmpty().trim(),
    (0, express_validator_1.body)('userId', error_messages_1.generalErrors.invalidMongoId).optional({ checkFalsy: true }).isMongoId(),
];
exports.expenseUpdationValidation = [
    (0, express_validator_1.body)('name', error_messages_1.expenseErrors.nameNotPresent).optional({ checkFalsy: true }).trim().notEmpty(),
    (0, express_validator_1.body)('date', error_messages_1.expenseErrors.invalidDate).optional({ checkFalsy: true }).isDate(),
    (0, express_validator_1.body)('amount', error_messages_1.expenseErrors.amountNotPresent).optional({ checkFalsy: true }).custom(customValidators_1.budgetValidator),
    (0, express_validator_1.body)('userId', error_messages_1.expenseErrors.userIdNotPresent).exists().bail().notEmpty().trim(),
    (0, express_validator_1.body)('userId', error_messages_1.generalErrors.invalidMongoId).optional({ checkFalsy: true }).isMongoId(),
];
let expense_create = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }
        let expenseDate = new Date(req.body.date);
        let month = expenseDate.getMonth() + 1;
        let year = expenseDate.getFullYear();
        try {
            let monthBudget = yield MonthBudget_1.default.findOne({ month: month, year: year }).lean();
            if (!monthBudget || monthBudget.budget <= 0) {
                res.json({ message: error_messages_1.expenseErrors.noMonthBudgetExists });
                return;
            }
            let expenseData = {
                name: req.body.name,
                date: req.body.date,
                amount: req.body.amount,
                userId: req.user._id
            };
            let newExpense = new Expense_1.default(expenseData);
            let createdExpense = yield newExpense.save();
            let _a = createdExpense.toJSON(), { __v } = _a, returnExpense = __rest(_a, ["__v"]);
            res.json(returnExpense);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.expense_create = expense_create;
let expense_get_by_id = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let expense = yield Expense_1.default.findById(req.params.id);
            if (!expense) {
                res.status(404).json({ error: error_messages_1.expenseErrors.notFound });
                return;
            }
            else if (expense.userId.toString() !== req.user._id.toString()) {
                res.status(401).send('Unauthorized');
                return;
            }
            res.json(expense);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.expense_get_by_id = expense_get_by_id;
let expense_get_all = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = {};
            if (req.query.date)
                query.date = req.query.date;
            if (req.query.name)
                query.name = req.query.name;
            query.userId = req.user._id;
            let expenses = yield Expense_1.default.find(query).lean();
            res.json(expenses);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.expense_get_all = expense_get_all;
let expense_update_by_id = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let existingExpense = yield Expense_1.default.findById(req.params.id).lean();
            if (!existingExpense) {
                res.status(404).json({ error: error_messages_1.expenseErrors.notFound });
            }
            else {
                if (existingExpense.userId.toString() !== req.user._id.toString()) {
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
            res.json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }
        let expenseUpdateData = {};
        let expenseDate, month, year;
        if (req.body.date) {
            try {
                expenseDate = new Date(req.body.date);
                month = expenseDate.getMonth() + 1;
                year = expenseDate.getFullYear();
                expenseUpdateData.date = req.body.date;
                let monthBudget = yield MonthBudget_1.default.findOne({ month: month, year: year }).lean();
                if (!monthBudget || monthBudget.budget <= 0) {
                    res.json({ message: error_messages_1.expenseErrors.noMonthBudgetExists });
                    return;
                }
            }
            catch (err) {
                return next(err);
            }
        }
        try {
            if (req.body.name)
                expenseUpdateData.name = req.body.name;
            if (req.body.amount)
                expenseUpdateData.amount = req.body.amount;
            let updatedExpense = yield Expense_1.default.findByIdAndUpdate(req.params.id, expenseUpdateData);
            res.json(updatedExpense);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.expense_update_by_id = expense_update_by_id;
//# sourceMappingURL=expense_controller.js.map