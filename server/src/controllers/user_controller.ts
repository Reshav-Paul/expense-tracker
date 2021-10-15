import { RequestHandler } from 'express';
import { body, check, validationResult } from 'express-validator';
import { UserType } from '../utilities/types/types';
import User from '../models/User';


export let user_signup: RequestHandler = async function (req, res, next) {
    let newUserData: UserType = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    }

    let newUser = new User(newUserData);
    try {
        let createdUser = await newUser.save();
        let { password, __v, ...returnUserData } = createdUser.toJSON();
        res.status(200).json(returnUserData);
    } catch (e) {
        res.status(400).json(e);
    }
}

export let user_get_by_id: RequestHandler = async function (req, res, next) {
    if (!check(req.params.id).isMongoId()) {
        return;
    }
    try {
        let user = await User.findById(req.params.id).lean();
        res.status(200).json(user).end();
    } catch (e) {
        res.status(404).json(e);
    }
}