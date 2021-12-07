import { NextFunction, Response, Router } from 'express';
import { authenticateUserIdInBody, validateParamIdAndRespond } from '../utilities/middlewares/validation_middlewares';

import * as auth_controller from '../controllers/auth_controller';
import * as month_budget_controller from '../controllers/month_budget_controller';

let monthBudgetRouter = Router();

let authUserFromBody = function (req: any, res: Response, next: NextFunction) {
    return authenticateUserIdInBody('userId', req, res, next);
}

monthBudgetRouter.post('/', auth_controller.user_auth, ...month_budget_controller.monthBudgetCreationValidation,
    authUserFromBody, month_budget_controller.month_budget_create);
monthBudgetRouter.get('/', auth_controller.user_auth, month_budget_controller.month_budget_get_all);
monthBudgetRouter.get('/:id', auth_controller.user_auth,
    validateParamIdAndRespond, month_budget_controller.month_budget_get_by_id);
monthBudgetRouter.put('/:id', auth_controller.user_auth, validateParamIdAndRespond,
    ...month_budget_controller.monthBudgetUpdationValidation, authUserFromBody,
    month_budget_controller.month_budget_update_by_id);

export default monthBudgetRouter;