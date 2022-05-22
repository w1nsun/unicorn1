import { Connection } from 'typeorm';
import { UuidService } from '../../core/service/uuid.service';
import { Injectable } from '@nestjs/common';
import { IFixtureLoader } from '../../core/fixture/ifixture-loader.fixture';
import * as moment from 'moment';
import { Agency } from '../entity/agency.entity';
import { ChainFixture } from './chain.fixture';
import { Chain } from '../entity/chain.entity';

@Injectable()
export class AgencyFixture implements IFixtureLoader {
    public static readonly ID_SL_DEMIIVSKA = 'a5a14eb6-e4ff-471e-babc-0d1cab7df93a';
    public static readonly ID_SL_PECHERSK = '4cfb2c51-4a7d-4f0a-a9ff-6c0ca5d3769a';
    public static readonly ID_365_CENTER = '54a6f582-c1d4-4ee7-90c4-c759e7ef2dc9';
    public static readonly ID_365_LUKIANIVSKA = '8bc0d0d8-1474-41ae-a471-888a04461186';

    constructor(private connection: Connection, private uuidService: UuidService) {}

    async load(): Promise<any> {
        const yesterday: Date = moment().subtract(1, 'day').toDate();
        await this.connection
            .createQueryBuilder()
            .insert()
            .into(Agency)
            .values([
                {
                    id: AgencyFixture.ID_SL_DEMIIVSKA,
                    title: 'Sport Life',
                    active: true,
                    chain: { id: ChainFixture.ID_SPORT_LIFE } as Chain,
                    createdAt: yesterday,
                    updatedAt: yesterday,
                },
                {
                    id: AgencyFixture.ID_SL_PECHERSK,
                    title: '365 Studio',
                    active: true,
                    chain: { id: ChainFixture.ID_SPORT_LIFE } as Chain,
                    createdAt: yesterday,
                    updatedAt: yesterday,
                },
            ])
            .execute();
    }

    getDependencies() {
        return [ChainFixture];
    }
}
