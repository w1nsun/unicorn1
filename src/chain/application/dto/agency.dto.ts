import { ApiProperty } from '@nestjs/swagger';
import { Agency } from '../../domain/entity/agency.entity';

export class AgencyDto {
    @ApiProperty({ example: '62ba0d6ee6b0a0ebfb57a9a0' })
    id: string;

    @ApiProperty({ example: 'Sport Life' })
    title: string;

    @ApiProperty()
    active: boolean;

    // @ApiProperty()
    // chain: ChainDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ type: Date })
    updatedAt: Date | null;

    static fromEntity(entity: Agency): AgencyDto {
        const dto = new this();
        dto.id = entity.id;
        dto.title = entity.title;
        dto.active = entity.active;
        // dto.chain = ChainDto.fromEntity(entity.chain);
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;

        return dto;
    }
}
