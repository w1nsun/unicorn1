import { ApiProperty } from '@nestjs/swagger';
import { Agency } from '../../domain/entity/agency.entity';
import { ChainDto } from '@root/chain/application/dto/chain.dto';

export class AgencyDto {
    @ApiProperty({ example: '35726a73-0022-4fc8-baa3-119df50c23d7' })
    id: string;

    @ApiProperty({ example: 'Sport Life' })
    title: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    chain: ChainDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ type: Date })
    updatedAt: Date | null;

    static fromEntity(entity: Agency): AgencyDto {
        const dto = new this();
        dto.id = entity.id;
        dto.title = entity.title;
        dto.active = entity.active;
        dto.chain = ChainDto.fromEntity(entity.chain);
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;

        return dto;
    }
}
