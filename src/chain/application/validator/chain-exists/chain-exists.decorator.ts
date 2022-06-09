import { registerDecorator, ValidationOptions } from 'class-validator';
import { ChainExistsValidator } from './chain-exists.validator';

export function ChainExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'ChainExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: ChainExistsValidator,
        });
    };
}
