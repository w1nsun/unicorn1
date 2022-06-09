import { Connection } from 'typeorm';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Agency } from '../../domain/entity/agency.entity';
import { ChainFixture } from './chain.fixture';
import { Chain } from '../../domain/entity/chain.entity';
import { IFixture } from '../../../fixture/ifixture.fixture';

@Injectable()
export class AgencyFixture implements IFixture {
    public static readonly ID_SL_DEMIIVSKA = 'a5a14eb6-e4ff-471e-babc-0d1cab7df93a';
    public static readonly ID_SL_PECHERSK = '4cfb2c51-4a7d-4f0a-a9ff-6c0ca5d3769a';
    public static readonly ID_SL_PODIL = '621f40b6-c8d0-4947-b5b2-8bd6061b65cc';
    public static readonly ID_365_CENTER = '54a6f582-c1d4-4ee7-90c4-c759e7ef2dc9';
    public static readonly ID_365_LUKIANIVSKA = '8bc0d0d8-1474-41ae-a471-888a04461186';

    constructor(private connection: Connection, private uuidService: IdGeneratorService) {}

    async load(): Promise<void> {
        const yesterday: Date = moment().subtract(1, 'day').toDate();
        await this.connection
            .createQueryBuilder()
            .insert()
            .into(Agency)
            .values([
                {
                    id: AgencyFixture.ID_SL_DEMIIVSKA,
                    title: 'Demiivska',
                    active: true,
                    chain: { id: ChainFixture.ID_SPORT_LIFE } as Chain,
                    createdAt: yesterday,
                    updatedAt: yesterday,
                },
                {
                    id: AgencyFixture.ID_SL_PECHERSK,
                    title: 'Pechersk',
                    active: true,
                    chain: { id: ChainFixture.ID_SPORT_LIFE } as Chain,
                    createdAt: yesterday,
                    updatedAt: yesterday,
                },
                {
                    id: AgencyFixture.ID_SL_PODIL,
                    title: 'Podil',
                    active: true,
                    chain: { id: ChainFixture.ID_SPORT_LIFE } as Chain,
                    createdAt: yesterday,
                    updatedAt: yesterday,
                },
                {
                    id: AgencyFixture.ID_365_CENTER,
                    title: 'Center',
                    active: true,
                    chain: { id: ChainFixture.ID_365_STUDIO } as Chain,
                    createdAt: yesterday,
                    updatedAt: yesterday,
                },
                {
                    id: AgencyFixture.ID_365_LUKIANIVSKA,
                    title: 'Lukianivska',
                    active: true,
                    chain: { id: ChainFixture.ID_365_STUDIO } as Chain,
                    createdAt: yesterday,
                    updatedAt: yesterday,
                },
            ])
            .execute();
    }

    async cleanDB(): Promise<void> {
        const repo = await this.connection.getRepository(Agency);
        const tableName = await repo.metadata.tableName;
        await repo.query(`TRUNCATE ${tableName} RESTART IDENTITY CASCADE;`);
    }

    getDependencies() {
        return [ChainFixture];
    }
}
