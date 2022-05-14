import { Connection } from 'typeorm';
import { UuidService } from '../../core/service/uuid.service';
import { Chain } from '../entity/chain.entity';
import { Injectable } from '@nestjs/common';
import { IFixture } from 'src/core/fixture/ifixture.fixture';
import { IFixtureDependent } from 'src/core/fixture/idependent.fixture';

@Injectable()
export class ChainFixture implements IFixture, IFixtureDependent {
    constructor(private connection: Connection, private uuidService: UuidService) {}

    async load() {
        await this.connection
            .createQueryBuilder()
            .insert()
            .into(Chain)
            .values([
                {
                    id: this.uuidService.generateV4(),
                    title: 'Test from fixture',
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ])
            .execute();
    }

    getDependencies(): string[] {
        return [];
    }
}
