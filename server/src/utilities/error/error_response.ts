import { ValidationError } from 'express-validator';

export function createValidationError(errors: ValidationError[]) {
    return {
        error: {
            status: 'Validation_Error',
            errors: errors
        }
    }
}

export function formatToValidationErrorInBody(value: string, message: string, param: string): ValidationError {
    return {
        value,
        msg: message,
        param,
        location: 'body'
    }
}

export function createQueryValidationError(message: string) {
    return {
        error: {
            status: 'Invalid_Query',
            message,
        }
    }
}

export function createNotFoundError(message: string) {
    return {
        error: {
            status: 'Not_Found',
            message,
        }
    }
}

export function createEntityExistsError(message: string) {
    return {
        error: {
            status: 'Entity_Exists',
            message,
        }
    }
}

export function createUnauthorizedError() {
    return 'Unauthorized';
}

export function createDbError(error: any) {
    return {
        error: {
            status: 'Database Error',
            message: error,
        }
    };
}