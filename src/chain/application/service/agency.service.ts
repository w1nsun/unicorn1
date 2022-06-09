import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { Chain } from '../../domain/entity/chain.entity';
import { AbstractEntityService } from '@core/service/abstract-entity.service';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { UpdateChainDto } from '../dto/update-chain.dto';
import { Agency } from '../../domain/entity/agency.entity';
import { CreateAgencyDto } from '../dto/create-agency.dto';
import { UpdateAgencyDto } from '../dto/update-agency.dto';
import { ChainService } from './chain.service';

@Injectable()
export class AgencyService extends AbstractEntityService<Agency, CreateAgencyDto, UpdateAgencyDto> {
    constructor(
        connection: Connection,
        uuidService: IdGeneratorService,
        entityName: EntityTarget<Agency>,
        private chainService: ChainService,
    ) {
        super(connection, uuidService, entityName);
    }

    async create(dto: CreateAgencyDto): Promise<Agency> {
        const { title, active, chainId } = { ...dto };
        const chain: Chain = await this.chainService.getById(chainId);
        const entity = new Agency(this.uuidService.generateUuidV4(), title, chain);

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
