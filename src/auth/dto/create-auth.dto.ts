import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(128)
    password: string;

    @IsNotEmpty()
    @MinLength(3, {
        each: true,
    })
    @MaxLength(128, {
        each: true,
    })
    logins: string[];
}
