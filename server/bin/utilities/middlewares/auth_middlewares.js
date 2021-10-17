"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserIdInParam = void 0;
const express_validator_1 = require("express-validator");
let validateUserIdInParam = function (req, res, next) {
    let validId = (0, express_validator_1.check)(req.params.id).isMongoId();
    if (!validId) {
        res.status(400).json({ error: 'Wrong ID' });
        return;
    }
    if (req.user._id.toString() === req.params.id) {
        next();
        return;
    }
    res.status(401).send('Unauthorized');
};
exports.validateUserIdInParam = validateUserIdInParam;
//# sourceMappingURL=auth_middlewares.js.map