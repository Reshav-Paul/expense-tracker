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
exports.user_auth = exports.user_login = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
let userLoginVerify = function userLoginVerify(email, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield User_1.default.findOne({ email: email }).select('+email +password').lean();
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            let compareSuccess = yield bcryptjs_1.default.compare(password, user.password);
            if (compareSuccess)
                return done(null, user);
            else
                return done(null, false, { message: 'Wrong Password' });
        }
        catch (e) {
            return done(e);
        }
    });
};
let userAuthVerify = function userAuthVerify(payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (payload.user) {
            try {
                let user = yield User_1.default.findById(payload.user._id).lean();
                if (user)
                    return done(null, user);
                else
                    return done(null, false);
            }
            catch (e) {
                return done(e, false);
            }
        }
    });
};
let localStrategyOptions = {
    passwordField: 'password',
    usernameField: 'email',
    session: false,
};
passport_1.default.use('user-login', new passport_local_1.Strategy(localStrategyOptions, userLoginVerify));
let jwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtSecret,
};
passport_1.default.use('user-auth', new JwtStrategy(jwtStrategyOptions, userAuthVerify));
let user_login = function userLogin(req, res, next) {
    passport_1.default.authenticate('user-login', function (err, user, message) {
        if (err || !user) {
            if (message) {
                res.status(400).json(message);
                return;
            }
            return next(new Error('An Error Occured during Login! Please try Again.'));
        }
        req.login(user, { session: false }, err => {
            if (err)
                return next(err);
            const body = { _id: user._id, email: user.email };
            const token = jsonwebtoken_1.default.sign({ user: body }, process.env.jwtSecret);
            res.json({
                login: true,
                email: user.email,
                id: user._id,
                token: token,
            });
        });
    })(req, res, next);
};
exports.user_login = user_login;
exports.user_auth = passport_1.default.authenticate('user-auth', { session: false });
//# sourceMappingURL=auth_controller.js.map