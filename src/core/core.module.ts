import { ChainModule } from '../chain/chain.module';
import { forwardRef, Module } from '@nestjs/common';
import { FixtureLoader } from './fixture/loader.fixture';
import { UuidService } from './service/uuid.service';
import { ChainFixture } from '../chain/fixture/chain.fixture';

@Module({
    exports: [UuidService, FixtureLoader],
    imports: [forwardRef(() => ChainModule)],
    providers: [
        UuidService,
        {
            provide: FixtureLoader,
            useFactory: (chainFixture: ChainFixture) => {
                return new FixtureLoader([chainFixture]);
            },
            inject: [ChainFixture],
        },
    ],
})
export class CoreModule {}
