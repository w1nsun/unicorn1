import { ChainModule } from '../chain/chain.module';
import { Module } from '@nestjs/common';
import { ChainFixture } from '../chain/fixture/chain.fixture';
import { FixtureLoader } from './service/fixture-loader.service';
import { AgencyFixture } from '../chain/fixture/agency.fixture';
import { IFixture } from './ifixture.fixture';

@Module({
    imports: [ChainModule],
    exports: [FixtureLoader],
    providers: [
        {
            provide: FixtureLoader,
            useFactory: (...fixtures: IFixture[]) => new FixtureLoader(fixtures),
            inject: [ChainFixture, AgencyFixture],
        },
    ],
})
export class FixtureModule {}
