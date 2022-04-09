import { IsBoolean, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgencyDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(128)
    title: string;

    @ApiProperty()
    @IsBoolean()
    active: boolean;
}
