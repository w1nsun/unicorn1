export class UserNotFoundException extends Error {
    constructor(public message: string = 'User no found') {
        super(message);
    }
}
