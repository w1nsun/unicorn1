export class RuntimeException extends Error {
    constructor(public message: string = 'Runtime exception') {
        super(message);
    }
}
