import { ApiProperty } from '@nestjs/swagger';
import { Chain } from '../../domain/entity/chain.entity';

export class ChainDto {
    @ApiProperty({ example: '35726a73-0022-4fc8-baa3-119df50c23d7' })
    id: string;

    @ApiProperty({ example: 'Sport Life' })
    title: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ type: Date })
    updatedAt: Date | null;

    static fromEntity(entity: Chain): ChainDto {
        const dto = new this();
        dto.id = entity.id;
        dto.title = entity.title;
        dto.active = entity.active;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;

        return dto;
    }
}
