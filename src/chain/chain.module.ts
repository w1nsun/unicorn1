import { Module } from '@nestjs/common';
import { ChainService } from './application/service/chain.service';
import { ChainController } from './ui/controller/chain.controller';
import { Chain } from './domain/entity/chain.entity';
import { AgencyController } from './ui/controller/agency.controller';
import { ChainExistsValidator } from './application/validator/chain-exists/chain-exists.validator';
import { AgencyService } from './application/service/agency.service';
import { Agency } from './domain/entity/agency.entity';
import { ChainFixture } from './infrastructure/fixture/chain.fixture';
import { CoreModule } from '@core/core.module';
import { AgencyFixture } from './infrastructure/fixture/agency.fixture';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [Chain, Agency] }), CoreModule],
    providers: [
        ChainService,
        AgencyService,
        ChainExistsValidator,
        ChainFixture,
        AgencyFixture,
    ],
    controllers: [ChainController, AgencyController],
    exports: [ChainService, ChainFixture, AgencyFixture],
})
export class ChainModule {}
