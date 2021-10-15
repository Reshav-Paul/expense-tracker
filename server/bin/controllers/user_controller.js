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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_get_by_id = exports.user_signup = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
let user_signup = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let newUserData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        };
        let newUser = new User_1.default(newUserData);
        try {
            let createdUser = yield newUser.save();
            let _a = createdUser.toJSON(), { password, __v } = _a, returnUserData = __rest(_a, ["password", "__v"]);
            res.status(200).json(returnUserData);
        }
        catch (e) {
            res.status(400).json(e);
        }
    });
};
exports.user_signup = user_signup;
let user_get_by_id = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, express_validator_1.check)(req.params.id).isMongoId()) {
            return;
        }
        try {
            let user = yield User_1.default.findById(req.params.id).lean();
            res.status(200).json(user).end();
        }
        catch (e) {
            res.status(404).json(e);
        }
    });
};
exports.user_get_by_id = user_get_by_id;
//# sourceMappingURL=user_controller.js.map