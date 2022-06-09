import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ChainService } from '../../service/chain.service';

@ValidatorConstraint({ name: 'ChainExistsValidator', async: true })
@Injectable()
export class ChainExistsValidator implements ValidatorConstraintInterface {
    constructor(private chainService: ChainService) {}

    async validate(value: string) {
        try {
            await this.chainService.getById(value);
        } catch (e) {
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return `Chain doesn't exist`;
    }
}
