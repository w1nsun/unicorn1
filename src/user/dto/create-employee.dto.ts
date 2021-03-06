import { IsBoolean, IsEmail, IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChainExists } from '../../chain/application/validator/chain-exists/chain-exists.decorator';

export class CreateEmployeeDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(32)
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(128)
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(128)
    password: string;

    @ApiProperty()
    @IsBoolean()
    active: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    @ChainExists()
    chainId: string;
}
