import { IsBoolean, IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChainExists } from '../validator/chain-exists/chain-exists.decorator';

export class CreateAgencyDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(128)
    title: string;

    @ApiProperty()
    @IsBoolean()
    active: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    @ChainExists()
    chainId: string;
}
