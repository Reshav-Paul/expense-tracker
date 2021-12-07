import { NextFunction, Response, Router } from 'express';
import { authenticateUserIdInBody, validateParamIdAndRespond } from '../utilities/middlewares/validation_middlewares';

import * as auth_controller from '../controllers/auth_controller';
import * as year_budget_controller from '../controllers/year_budget_controller';

let yearBudgetRouter = Router();

let authUserFromBody = function (req: any, res: Response, next: NextFunction) {
    return authenticateUserIdInBody('userId', req, res, next);
}

yearBudgetRouter.post('/', auth_controller.user_auth, ...year_budget_controller.yearBudgetCreationValidation,
    authUserFromBody, year_budget_controller.year_budget_create);
yearBudgetRouter.get('/', auth_controller.user_auth, year_budget_controller.year_budget_get_all);
yearBudgetRouter.get('/:id', auth_controller.user_auth,
    validateParamIdAndRespond, year_budget_controller.year_budget_get_by_id);
yearBudgetRouter.put('/:id', auth_controller.user_auth, validateParamIdAndRespond,
    ...year_budget_controller.yearBudgetUpdationValidation, authUserFromBody,
    year_budget_controller.year_budget_update_by_id);

export default yearBudgetRouter;