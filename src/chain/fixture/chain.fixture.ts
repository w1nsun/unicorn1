import { Connection } from 'typeorm';
import { UuidService } from '../../core/service/uuid.service';
import { Chain } from '../entity/chain.entity';
import { Injectable } from '@nestjs/common';
import { IFixture } from '../../core/fixture/ifixture.fixture';
import { IFixtureDependent } from '../../core/fixture/idependent.fixture';

@Injectable()
export class ChainFixture implements IFixture, IFixtureDependent {
    constructor(private connection: Connection, private uuidService: UuidService) {}

    async load() {
        const nowDate = new Date();

        const res = await this.connection
            .createQueryBuilder()
            .insert()
            .into(Chain)
            .values([
                {
                    id: this.uuidService.generateV4(),
                    title: 'Sport Life',
                    active: true,
                    createdAt: nowDate,
                    updatedAt: nowDate,
                },
                {
                    id: this.uuidService.generateV4(),
                    title: 'Studio 360',
                    active: true,
                    createdAt: nowDate,
                    updatedAt: nowDate,
                },
            ])
            .execute();

        console.log(res);
    }

    getDependencies(): string[] {
        return [];
    }
}
