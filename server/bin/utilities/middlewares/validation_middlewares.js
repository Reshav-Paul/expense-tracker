"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserIdInBody = exports.authenticateUserIdInParam = exports.validateParamIdAndRespond = void 0;
const error_messages_1 = require("../error/error_messages");
const customValidators_1 = require("../helpers/customValidators");
let validateParamIdAndRespond = function (req, res, next) {
    if (!(0, customValidators_1.validateMongoId)(req.params.id)) {
        res.status(400).json({ error: error_messages_1.generalErrors.invalidMongoId });
        return;
    }
    return next();
};
exports.validateParamIdAndRespond = validateParamIdAndRespond;
let authenticateUserIdInParam = function (req, res, next) {
    if (!(0, customValidators_1.validateMongoId)(req.params.id)) {
        res.status(400).json({ message: error_messages_1.generalErrors.invalidMongoId });
        return;
    }
    if (req.user._id.toString() === req.params.id) {
        return next();
    }
    res.status(401).send('Unauthorized');
};
exports.authenticateUserIdInParam = authenticateUserIdInParam;
let authenticateUserIdInBody = function (param, req, res, next) {
    let validationError = [{
            value: req.body[param],
            msg: error_messages_1.generalErrors.invalidMongoId,
            param,
            location: 'body'
        }];
    if (!req.body[param] || !(0, customValidators_1.validateMongoId)(req.body[param])) {
        let errorBody = {
            error: {
                status: 'Validation_Error',
                errors: validationError
            }
        };
        res.status(400).json(errorBody);
        return;
    }
    if (req.user._id.toString() === req.body[param]) {
        return next();
    }
    res.status(401).send('Unauthorized');
};
exports.authenticateUserIdInBody = authenticateUserIdInBody;
//# sourceMappingURL=validation_middlewares.js.map