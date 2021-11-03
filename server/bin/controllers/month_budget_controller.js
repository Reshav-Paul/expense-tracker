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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.month_budget_get = exports.month_budget_get_by_id = void 0;
const customValidators_1 = require("../utilities/helpers/customValidators");
const MonthBudget_1 = __importDefault(require("../models/MonthBudget"));
const error_messages_1 = require("../utilities/error/error_messages");
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
let month_budget_get = function (req, res, next) {
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
            if (req.query.month)
                query.month = req.query.month;
            query.userId = req.user._id;
            let monthBudgets = yield MonthBudget_1.default.find(query).lean();
            if (monthBudgets.length === 0) {
                res.status(404).json({ error: error_messages_1.monthBudgetErrors.budgetNotPresent });
                return;
            }
            res.json(monthBudgets);
        }
        catch (err) {
            return next(err);
        }
    });
};
exports.month_budget_get = month_budget_get;
//# sourceMappingURL=month_budget_controller.js.map