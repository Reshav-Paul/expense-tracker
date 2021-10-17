import validator from "validator";

import { generalErrors } from '../error/error_messages';

export let validateMongoId = function validateMongoId(id: string) {
    return validator.isMongoId(id);
}

export let validateUserIdInParam = function (req: any, res: any, next: any) {
    if (!validateMongoId(req.params.id)) {
        res.status(400).json({ message: generalErrors.invalidMongoId });
        return;
    }
    if (req.user._id.toString() === req.params.id) {
        next();
        return;
    }
    res.status(401).send('Unauthorized');
}
