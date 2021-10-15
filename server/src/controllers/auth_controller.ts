import passport from 'passport';
import passportJwt from 'passport-jwt';
import { IStrategyOptions, Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { RequestHandler } from 'express';
import { mUserType } from '../utilities/types/types';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

let userLoginVerify: VerifyFunction = async function userLoginVerify(email, password, done) {
    try {
        let user = await User.findOne({ email: email }).select('+email +password').lean();
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        let compareSuccess = await bcrypt.compare(password, user.password);
        if (compareSuccess) return done(null, user);
        else return done(null, false, { message: 'Wrong Password' });
    } catch (e) {
        return done(e);
    }
}

let userAuthVerify: passportJwt.VerifyCallback = async function userAuthVerify(payload, done) {
    if (payload.user) {
        try {
            let user = await User.findById(payload.user._id).lean();
            if (user) return done(null, user);
            else return done(null, false);
        } catch (e) {
            return done(e, false);
        }
    }
}

let localStrategyOptions: IStrategyOptions = {
    passwordField: 'password',
    usernameField: 'email',
    session: false,
};
passport.use('user-login', new LocalStrategy(
    localStrategyOptions,
    userLoginVerify
));

let jwtStrategyOptions: passportJwt.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtSecret,
}

passport.use('user-auth', new JwtStrategy(
    jwtStrategyOptions,
    userAuthVerify
))

export let user_login: RequestHandler = function userLogin(req, res, next) {
    passport.authenticate('user-login', function (err, user: mUserType, message) {
        if (err || !user) {
            if (message) {
                res.status(400).json(message);
                return;
            }
            return next(new Error('An Error Occured during Login! Please try Again.'));
        }

        req.login(
            user,
            { session: false },
            err => {
                if (err) return next(err);
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, process.env.jwtSecret!);

                res.json({
                    login: true,
                    email: user.email,
                    id: user._id,
                    token: token,
                });
            }
        );
    })(req, res, next);
}

export let user_auth = passport.authenticate('user-auth', { session: false });
