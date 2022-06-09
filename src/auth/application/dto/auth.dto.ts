import { ApiProperty } from '@nestjs/swagger';
import { Auth } from '@auth/domain/entity/auth.entity';

export class AuthDto {
    @ApiProperty()
    logins: string[];

    static fromEntity(entity: Auth): AuthDto {
        const dto = new this();
        dto.logins = entity.logins.map((value) => {
            return value.login;
        });

        return dto;
    }
}
