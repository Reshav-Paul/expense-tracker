import { NextFunction, RequestHandler, Response } from "express";

import { generalErrors } from '../error/error_messages';
import { validateMongoId } from '../helpers/customValidators';

export let validateParamIdAndRespond: RequestHandler = function (req, res, next) {
    if (!validateMongoId(req.params.id)) {
        res.status(400).json({ error: generalErrors.invalidMongoId });
        return;
    }
    return next();
}

export let authenticateUserIdInParam: RequestHandler = function (req: any, res, next) {
    if (!validateMongoId(req.params.id)) {
        res.status(400).json({ message: generalErrors.invalidMongoId });
        return;
    }
    if (req.user._id.toString() === req.params.id) {
        return next();
    }
    res.status(401).send('Unauthorized');
}

export let authenticateUserIdInBody = function (param: string, req: any, res: Response, next: NextFunction) {
    let validationError = [{
        value: req.body[param],
        msg: generalErrors.invalidMongoId,
        param,
        location: 'body'
    }];

    if (!req.body[param] || !validateMongoId(req.body[param])) {
        let errorBody = {
            error: {
                status: 'Validation_Error',
                errors: validationError
            }
        }
        res.status(400).json(errorBody);
        return;
    }
    if (req.user._id.toString() === req.body[param]) {
        return next();
    }
    res.status(401).send('Unauthorized');
}