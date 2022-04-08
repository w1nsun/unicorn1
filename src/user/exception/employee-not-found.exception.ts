export class EmployeeNotFoundException extends Error {
    constructor(public message: string = 'Employee no found') {
        super(message);
    }
}
