import { NextFunction, Response, Router } from 'express';
import { authenticateUserIdInBody, validateParamIdAndRespond } from '../utilities/middlewares/validation_middlewares';

import * as auth_controller from '../controllers/auth_controller';
import * as expense_controller from '../controllers/expense_controller';

let expenseRouter = Router();

let authUserFromBody = function (req: any, res: Response, next: NextFunction) {
    return authenticateUserIdInBody('userId', req, res, next);
}

expenseRouter.post('/', auth_controller.user_auth, ...expense_controller.expenseCreationValidation,
    authUserFromBody, expense_controller.expense_create);
expenseRouter.get('/', auth_controller.user_auth, expense_controller.expense_get_all);
expenseRouter.get('/:id', auth_controller.user_auth,
    validateParamIdAndRespond, expense_controller.expense_get_by_id);
expenseRouter.put('/:id', auth_controller.user_auth, validateParamIdAndRespond,
    ...expense_controller.expenseUpdationValidation, authUserFromBody,
    expense_controller.expense_update_by_id);

export default expenseRouter;