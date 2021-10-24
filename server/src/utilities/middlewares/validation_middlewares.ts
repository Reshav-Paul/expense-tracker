import { NextFunction, RequestHandler, Response } from "express";

import { generalErrors } from '../error/error_messages';
import { validateMongoId } from '../helpers/customValidators';

export let validateParamIdAndRespond: RequestHandler = function (req, res, next) {
    if (!validateMongoId(req.params.id)) {
        res.status(400).json({ error: generalErrors.invalidMongoId });
        return;
    }
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
    if (!validateMongoId(req.body[param])) {
        res.status(400).json({ parameter: param, error: generalErrors.invalidMongoId });
        return;
    }
    if (req.user._id.toString() === req.body[param]) {
        return next();
    }
    res.status(401).send('Unauthorized');
}