import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

import { UserType, UserUpdateType } from '../utilities/types/types';
import User from '../models/User';
import { userErrors } from '../utilities/error/error_messages';
import { createValidationError, formatToValidationErrorInBody, createDbError, createNotFoundError, createUnauthorizedError } from '../utilities/error/error_response';

export let userCreationValidation = [
    body('firstname', userErrors.noFirstname).exists().bail().trim().notEmpty(),
    body('firstname', userErrors.invalidFirstname).optional({ checkFalsy: true }).isAlpha(),
    body('lastname', userErrors.noLastname).exists().bail().trim().notEmpty(),
    body('lastname', userErrors.invalidLastname).optional({ checkFalsy: true }).isAlpha(),
    body('username', userErrors.noUsername).exists().bail().trim().notEmpty(),
    body('email', userErrors.noEmail).exists().bail().trim().notEmpty(),
    body('email', userErrors.invalidEmail).exists().bail().optional({ checkFalsy: true }).isEmail(),
    body('password', userErrors.noPassword).exists().bail().trim().notEmpty(),
];

export let userUpdationValidation = [
    body('firstname', userErrors.invalidFirstname).optional({ checkFalsy: true }).trim().isAlpha(),
    body('lastname', userErrors.invalidLastname).optional({ checkFalsy: true }).trim().isAlpha(),
];

export let user_create: RequestHandler = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(createValidationError(errors.array()));
        return;
    }

    let newUserData: UserType = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    };

    let newUser = new User(newUserData);
    try {
        let createdUser = await newUser.save();
        let { password, __v, ...returnUserData } = createdUser.toJSON();
        res.status(200).json(returnUserData);
    } catch (e: any) {
        if (e.code === 11000) {
            if (e.keyPattern.email === 1) {
                res.status(400).json(createValidationError(
                    [formatToValidationErrorInBody(e.keyValue.email, userErrors.duplicateEmail, 'email')]
                ));
            }
        } else {
            res.status(400).json(createDbError(e));
        }
    }
}

export let user_get_by_id: RequestHandler = async function (req, res, next) {
    try {
        let user = await User.findById(req.params.id).lean();
        if (!user) {
            res.status(404).json(createNotFoundError(userErrors.noUserFound));
            return;
        }
        res.status(200).json(user);
    } catch (e) {
        return next(e);
    }
}

export let user_get_me: RequestHandler = async function (req: any, res, next) {
    if (!req.user || !req.user._id) {
        res.status(401).send(createUnauthorizedError());
        return;
    }
    try {
        let me = await User.findById(req.user._id).lean();
        if (!me) {
            res.status(404).json(createNotFoundError(userErrors.noUserFound));
            return;
        }
        res.json(me);
    } catch (err) {
        return next(err);
    }
}

export let user_update: RequestHandler = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(createValidationError(errors.array()));
        return;
    }

    const userData: UserUpdateType = {};
    if (req.body.firstname) userData.firstname = req.body.firstname;
    if (req.body.lastname) userData.lastname = req.body.lastname;

    try {
        let currentUser = await User.findById(req.params.id).lean();
        if (!currentUser) {
            res.status(404).json(createNotFoundError(userErrors.noUserFound));
            return;
        }
        if (Object.keys(userData).length === 0) {
            res.status(200).json(currentUser);
        } else {
            let updatedUser = await User.findByIdAndUpdate(req.params.id, userData);
            res.status(200).json(updatedUser);
        }

    } catch (e) {
        return next(e);
    }

}
