import { Router } from 'express';

import * as user_controller from '../controllers/user_controller';
import * as auth_controller from '../controllers/auth_controller';
import { validateUserIdInParam } from '../utilities/middlewares/auth_middlewares';

let userRouter = Router();

userRouter.post('/signup', user_controller.user_signup);
userRouter.post('/login', auth_controller.user_login);
// userRouter.post('/logout', user_controller.user_logout);
userRouter.get('/:id', auth_controller.user_auth, validateUserIdInParam, user_controller.user_get_by_id);

export default userRouter;
