import { ApiProperty } from '@nestjs/swagger';
import { Chain } from '../../domain/entity/chain.entity';
import { Agency } from '@root/chain/domain/entity/agency.entity';
import { AgencyDto } from '@root/chain/application/dto/agency.dto';

export class ChainDto {
    @ApiProperty({ example: '35726a73-0022-4fc8-baa3-119df50c23d7' })
    id: string;

    @ApiProperty({ example: 'Sport Life' })
    title: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    agencies: AgencyDto[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ type: Date })
    updatedAt: Date | null;

    static fromEntity(entity: Chain): ChainDto {
        const dto = new this();
        dto.id = entity.id;
        dto.title = entity.getTitle();
        dto.active = entity.isActive();
        dto.agencies = entity.getAgencies().map((agency: Agency) => AgencyDto.fromEntity(agency));
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;

        return dto;
    }
}
