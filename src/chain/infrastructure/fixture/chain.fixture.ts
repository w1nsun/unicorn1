import { Connection } from 'typeorm';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { Chain } from '../../domain/entity/chain.entity';
import { IFixture } from '@root/fixture/ifixture.fixture';
import { IFixtureDependent } from '@root/fixture/idependent.fixture';

// @Injectable()
export class ChainFixture implements IFixture, IFixtureDependent {
    public static readonly ID_SPORT_LIFE = 'e72bb753-65f9-45ae-951d-c8aa11309362';
    public static readonly ID_365_STUDIO = '99a647d2-b6ef-4f48-8d4d-b10355897cdc';

    constructor(private connection: Connection, private uuidService: IdGeneratorService) {}

    async load(): Promise<void> {
        // const yesterday: Date = moment().subtract(1, 'day').toDate();
        // const res = await this.connection
        //     .createQueryBuilder()
        //     .insert()
        //     .into(Chain)
        //     .values([
        //         {
        //             id: ChainFixture.ID_SPORT_LIFE,
        //             title: 'Sport Life',
        //             active: true,
        //             createdAt: yesterday,
        //             updatedAt: yesterday,
        //         },
        //         {
        //             id: ChainFixture.ID_365_STUDIO,
        //             title: '365 Studio',
        //             active: true,
        //             createdAt: yesterday,
        //             updatedAt: yesterday,
        //         },
        //     ])
        //     .execute();
        //
        // console.log(res);
    }

    async cleanDB(): Promise<void> {
        const repo = await this.connection.getRepository(Chain);
        const tableName = await repo.metadata.tableName;
        await repo.query(`TRUNCATE ${tableName} RESTART IDENTITY CASCADE;`);
    }

    getDependencies(): string[] {
        return [];
    }
}
