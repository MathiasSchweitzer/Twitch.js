import { getType } from '../util/functions';

class AppError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class FunctionError extends AppError {
    constructor(message: string) {
        super(message);
    }
}

export class ArgumentError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class BadArgumentType extends ArgumentError {
    constructor(argumentName: string, argument: any, expectedType: string,) {
        super(`Argument '${argumentName}' type error: expected '${expectedType}' but got '${getType(argument)}' with value '${argument}'`);
    }
}

export class MissingArgument extends ArgumentError {
    constructor(argumentName: string) {
        super(`Missing argument: '${argumentName}'`);
    }
}