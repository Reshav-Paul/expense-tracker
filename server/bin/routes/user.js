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
const user_controller = __importStar(require("../controllers/user_controller"));
const auth_controller = __importStar(require("../controllers/auth_controller"));
const validation_middlewares_1 = require("../utilities/middlewares/validation_middlewares");
let userRouter = (0, express_1.Router)();
userRouter.post('/signup', ...user_controller.userCreationValidation, user_controller.user_create);
userRouter.post('/login', ...auth_controller.userLoginValidation, auth_controller.user_login);
userRouter.post('/logout', auth_controller.user_logout);
userRouter.get('/me', auth_controller.user_auth, user_controller.user_get_me);
userRouter.get('/:id', auth_controller.user_auth, validation_middlewares_1.authenticateUserIdInParam, user_controller.user_get_by_id);
userRouter.put('/:id', auth_controller.user_auth, validation_middlewares_1.authenticateUserIdInParam, ...user_controller.userUpdationValidation, user_controller.user_update);
exports.default = userRouter;
//# sourceMappingURL=user.js.map