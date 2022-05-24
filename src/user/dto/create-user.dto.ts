import { IsBoolean, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
}
