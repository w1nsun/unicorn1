import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { Chain } from '../../domain/entity/chain.entity';
import { AbstractEntityService } from '@core/service/abstract-entity.service';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { CreateChainDto } from '../dto/create-chain.dto';
import { UpdateChainDto } from '../dto/update-chain.dto';

@Injectable()
export class ChainService extends AbstractEntityService<Chain, CreateChainDto, UpdateChainDto> {
    constructor(connection: Connection, uuidService: IdGeneratorService, entityName: EntityTarget<Chain>) {
        super(connection, uuidService, entityName);
    }

    async create(dto: CreateChainDto): Promise<Chain> {
        const { title, active } = { ...dto };
        const entity = new Chain(this.uuidService.generateUuidV4(), title, active);

        return await this.repo.save(entity);
    }

    async update(id: string, dto: UpdateChainDto): Promise<Chain> {
        const repo = this.connection.getRepository(Chain);
        const entity: Chain = await this.getById(id);

        entity.active = dto.active;
        await repo.save(entity);

        return entity;
    }
}