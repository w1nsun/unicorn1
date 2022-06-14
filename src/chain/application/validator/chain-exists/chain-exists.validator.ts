import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ChainService } from '../../service/chain.service';

@ValidatorConstraint({ name: 'ChainExistsValidator', async: true })
@Injectable()
export class ChainExistsValidator implements ValidatorConstraintInterface {
    constructor(private readonly chainService: ChainService) {}

    async validate(value: string) {
        const chain = await this.chainService.findById(value);

        return !!chain;
    }

    defaultMessage(args: ValidationArguments) {
        return `Chain doesn't exist`;
    }
}
