"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserIdInParam = exports.validateMongoId = void 0;
const validator_1 = __importDefault(require("validator"));
const error_messages_1 = require("../error/error_messages");
let validateMongoId = function validateMongoId(id) {
    return validator_1.default.isMongoId(id);
};
exports.validateMongoId = validateMongoId;
let validateUserIdInParam = function (req, res, next) {
    if (!(0, exports.validateMongoId)(req.params.id)) {
        res.status(400).json({ message: error_messages_1.generalErrors.invalidMongoId });
        return;
    }
    if (req.user._id.toString() === req.params.id) {
        next();
        return;
    }
    res.status(401).send('Unauthorized');
};
exports.validateUserIdInParam = validateUserIdInParam;
//# sourceMappingURL=validation_middlewares.js.map