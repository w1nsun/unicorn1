import { Connection } from 'typeorm';
import { UuidService } from '../../core/service/uuid.service';
import { Chain } from '../entity/chain.entity';
import { Injectable } from '@nestjs/common';
import { IFixture } from 'src/core/fixture/ifixture.fixture';
import { IFixtureDependent } from 'src/core/fixture/idependent.fixture';
import * as moment from 'moment';

@Injectable()
export class ChainFixture implements IFixture, IFixtureDependent {
    public static readonly ID_SPORT_LIFE = 'e72bb753-65f9-45ae-951d-c8aa11309362';
    public static readonly ID_365_STUDIO = '99a647d2-b6ef-4f48-8d4d-b10355897cdc';

    constructor(private connection: Connection, private uuidService: UuidService) {}

    async load(): Promise<any> {
        const yesterday: Date = moment().subtract(1, 'day').toDate();
        let res = await this.connection
            .createQueryBuilder()
            .insert()
            .into(Chain)
            .values([
                {
                    id: ChainFixture.ID_SPORT_LIFE,
                    title: 'Sport Life',
                    active: true,
                    createdAt: yesterday,
                    updatedAt: yesterday,
                },
                {
                    id: ChainFixture.ID_365_STUDIO,
                    title: '365 Studio',
                    active: true,
                    createdAt: yesterday,
                    updatedAt: yesterday,
                },
            ])
            .execute();

        console.log(res);
    }

    getDependencies(): string[] {
        return [];
    }
}
