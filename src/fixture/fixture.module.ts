import { ChainModule } from '../chain/chain.module';
import { Module } from '@nestjs/common';
import { ChainFixture } from '../chain/fixture/chain.fixture';
import { FixtureLoader } from './service/fixture-loader.service';
import { AgencyFixture } from '../chain/fixture/agency.fixture';
import { IFixture } from './ifixture.fixture';
import { Connection } from 'typeorm';
import { UserModule } from '../user/user.module';

@Module({
    imports: [ChainModule, UserModule],
    exports: [FixtureLoader],
    providers: [
        {
            provide: FixtureLoader,
            useFactory: (connection: Connection, ...fixtures: IFixture[]) => new FixtureLoader(connection, fixtures),
            inject: [Connection, ChainFixture, AgencyFixture],
        },
    ],
})
export class FixtureModule {}
