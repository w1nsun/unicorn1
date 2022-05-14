export class OutOfBoundsException extends Error {
    constructor(public message: string = 'Out of bounds') {
        super(message);
    }
}
