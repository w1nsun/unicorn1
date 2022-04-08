export class EntityNotFoundException extends Error {
    constructor(public message: string = 'Entity no found') {
        super(message);
    }
}
