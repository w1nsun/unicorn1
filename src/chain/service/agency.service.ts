import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UuidService } from '../../core/service/uuid.service';
import { Chain } from '../entity/chain.entity';
import { AbstractEntityService } from '../../core/service/abstract-entity.service';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { UpdateChainDto } from '../dto/update-chain.dto';
import { Agency } from '../entity/agency.entity';
import { CreateAgencyDto } from '../dto/create-agency.dto';
import { UpdateAgencyDto } from '../dto/update-agency.dto';
import { ChainService } from './chain.service';

@Injectable()
export class AgencyService extends AbstractEntityService<
    Agency,
    CreateAgencyDto,
    UpdateAgencyDto
> {
    constructor(
        connection: Connection,
        uuidService: UuidService,
        entityName: EntityTarget<Agency>,
        private chainService: ChainService,
    ) {
        super(connection, uuidService, entityName);
    }

    async create(dto: CreateAgencyDto): Promise<Agency> {
        const { title, active, chainId } = { ...dto };
        const chain: Chain = await this.chainService.getById(chainId);
        const entity = new Agency(
            this.uuidService.generateV4(),
            title,
            active,
            chain,
        );

        return await this.repo.save(entity);
    }

    async update(id: string, dto: UpdateChainDto): Promise<Agency> {
        const repo = this.connection.getRepository(Chain);
        const entity: Agency = await this.getById(id);

        entity.active = dto.active;
        await repo.save(entity);

        return entity;
    }
}
