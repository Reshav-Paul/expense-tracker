"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middlewares_1 = require("../utilities/middlewares/validation_middlewares");
const auth_controller = __importStar(require("../controllers/auth_controller"));
const month_budget_controller = __importStar(require("../controllers/month_budget_controller"));
let monthBudgetRouter = (0, express_1.Router)();
let authUserFromBody = function (req, res, next) {
    return (0, validation_middlewares_1.authenticateUserIdInBody)('userId', req, res, next);
};
monthBudgetRouter.post('/', auth_controller.user_auth, ...month_budget_controller.monthBudgetCreationValidation, authUserFromBody, month_budget_controller.month_budget_create);
monthBudgetRouter.get('/', auth_controller.user_auth, month_budget_controller.month_budget_get_all);
monthBudgetRouter.get('/:id', auth_controller.user_auth, validation_middlewares_1.validateParamIdAndRespond, month_budget_controller.month_budget_get_by_id);
monthBudgetRouter.put('/:id', auth_controller.user_auth, validation_middlewares_1.validateParamIdAndRespond, ...month_budget_controller.monthBudgetUpdationValidation, authUserFromBody, month_budget_controller.month_budget_update_by_id);
exports.default = monthBudgetRouter;
//# sourceMappingURL=monthBudget.js.map