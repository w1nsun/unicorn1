import { ApiProperty } from '@nestjs/swagger';
import { Chain } from '../../domain/entity/chain.entity';
import { AgencyDto } from '@root/chain/application/dto/agency.dto';

export class ChainDto {
    @ApiProperty({ example: '35726a73-0022-4fc8-baa3-119df50c23d7' })
    id!: string;

    @ApiProperty({ example: 'Sport Life' })
    title!: string;

    @ApiProperty()
    active!: boolean;

    @ApiProperty()
    agencies!: AgencyDto[];

    @ApiProperty()
    createdAt!: Date;

    @ApiProperty({ type: Date })
    updatedAt!: Date | null;

    static fromEntity(entity: Chain): ChainDto {
        const dto = new this();

        for (const prop in dto) {
            if (entity.hasOwnProperty(prop) && dto[prop] instanceof entity[prop]) {
                dto[prop] = entity[prop];
            }
        }

        dto.id = entity.id;
        dto.title = entity.title;
        dto.active = entity.active;
        dto.agencies = entity.getAgenciesAsArray();
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;

        return dto;
    }
}
