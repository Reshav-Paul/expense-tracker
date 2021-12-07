"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbError = exports.createUnauthorizedError = exports.createEntityExistsError = exports.createNotFoundError = exports.createQueryValidationError = exports.formatToValidationErrorInBody = exports.createValidationError = void 0;
function createValidationError(errors) {
    return {
        error: {
            status: 'Validation_Error',
            errors: errors
        }
    };
}
exports.createValidationError = createValidationError;
function formatToValidationErrorInBody(value, message, param) {
    return {
        value,
        msg: message,
        param,
        location: 'body'
    };
}
exports.formatToValidationErrorInBody = formatToValidationErrorInBody;
function createQueryValidationError(message) {
    return {
        error: {
            status: 'Invalid_Query',
            message,
        }
    };
}
exports.createQueryValidationError = createQueryValidationError;
function createNotFoundError(message) {
    return {
        error: {
            status: 'Not_Found',
            message,
        }
    };
}
exports.createNotFoundError = createNotFoundError;
function createEntityExistsError(message) {
    return {
        error: {
            status: 'Entity_Exists',
            message,
        }
    };
}
exports.createEntityExistsError = createEntityExistsError;
function createUnauthorizedError() {
    return 'Unauthorized';
}
exports.createUnauthorizedError = createUnauthorizedError;
function createDbError(error) {
    return {
        error: {
            status: 'Database Error',
            message: error,
        }
    };
}
exports.createDbError = createDbError;
//# sourceMappingURL=error_response.js.map