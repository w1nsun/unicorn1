import { Module } from '@nestjs/common';
import { ChainService } from './application/service/chain.service';
import { ChainController } from './ui/controller/chain.controller';
import { Connection } from 'typeorm';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { Chain } from './domain/entity/chain.entity';
import { AgencyController } from './ui/controller/agency.controller';
import { ChainExistsValidator } from './application/validator/chain-exists/chain-exists.validator';
import { AgencyService } from './application/service/agency.service';
import { Agency } from './domain/entity/agency.entity';
import { ChainFixture } from './infrastructure/fixture/chain.fixture';
import { CoreModule } from '../core/core.module';
import { AgencyFixture } from './infrastructure/fixture/agency.fixture';

@Module({
    imports: [CoreModule],
    providers: [
        {
            provide: ChainService,
            useFactory: (conn: Connection, uuidService: IdGeneratorService) => {
                return new ChainService(conn, uuidService, Chain);
            },
            inject: [Connection, IdGeneratorService],
        },
        {
            provide: AgencyService,
            useFactory: (conn: Connection, uuidService: IdGeneratorService, chainService: ChainService) => {
                return new AgencyService(conn, uuidService, Agency, chainService);
            },
            inject: [Connection, IdGeneratorService, ChainService],
        },
        ChainExistsValidator,
        ChainFixture,
        AgencyFixture,
    ],
    controllers: [ChainController, AgencyController],
    exports: [ChainService, ChainFixture, AgencyFixture],
})
export class ChainModule {}
