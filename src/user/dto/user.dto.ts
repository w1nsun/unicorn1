import { User } from '../entity/user.entity';

export class UserDto {
    id: string;
    login: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date | null;

    static fromEntity(entity: User): UserDto {
        const dto = new this();
        dto.id = entity.id;
        dto.login = entity.login;
        dto.active = entity.active;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;

        return dto;
    }
}
