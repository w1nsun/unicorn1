import { User } from '../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ example: '35726a73-0022-4fc8-baa3-119df50c23d7' })
    id: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ type: Date })
    updatedAt: Date | null;

    static fromEntity(entity: User): UserDto {
        const dto = new this();
        dto.id = entity.id;
        dto.active = entity.active;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;

        return dto;
    }
}
