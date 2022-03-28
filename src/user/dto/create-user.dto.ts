import { IsBoolean, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(128)
    login: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(128)
    password: string;

    @IsBoolean()
    active: boolean;
}
