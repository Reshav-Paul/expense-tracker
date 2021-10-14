import { Router } from 'express';

import * as user_controller from '../controllers/user_controller';

let router = Router();

router.post('/signup', user_controller.user_signup);
router.post('/login', user_controller.user_login);
router.post('/logout', user_controller.user_logout);
router.get('/:id', user_controller.user_get_by_id);
module.exports = router;
