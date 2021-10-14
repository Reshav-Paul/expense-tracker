"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_get_by_id = exports.user_logout = exports.user_login = exports.user_signup = void 0;
let user_signup = function (req, res, next) {
    res.send('signup');
};
exports.user_signup = user_signup;
let user_login = function (req, res, next) {
    res.send('login');
};
exports.user_login = user_login;
let user_logout = function (req, res, next) {
    res.send('logout');
};
exports.user_logout = user_logout;
let user_get_by_id = function (req, res, next) {
    res.send('get by id');
};
exports.user_get_by_id = user_get_by_id;
//# sourceMappingURL=user_controller.js.map