import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ChainService } from './service/chain.service';
import { ChainController } from './controller/chain.controller';
import { Connection } from 'typeorm';
import { UuidService } from '../core/service/uuid.service';
import { Chain } from './entity/chain.entity';
import { AgencyController } from './controller/agency.controller';
import { ChainExistsValidator } from './validator/chain-exists/chain-exists.validator';
import { AgencyService } from './service/agency.service';
import { Agency } from './entity/agency.entity';
import { ChainFixture } from './fixture/chain.fixture';
import { AgencyFixture } from './fixture/agency.fixture';

@Module({
    imports: [CoreModule],
    providers: [
        {
            provide: ChainService,
            useFactory: (conn: Connection, uuidService: UuidService) => {
                return new ChainService(conn, uuidService, Chain);
            },
            inject: [Connection, UuidService],
        },
        {
            provide: AgencyService,
            useFactory: (
                conn: Connection,
                uuidService: UuidService,
                chainService: ChainService,
            ) => {
                return new AgencyService(
                    conn,
                    uuidService,
                    Agency,
                    chainService,
                );
            },
            inject: [Connection, UuidService, ChainService],
        },
        ChainExistsValidator,
        ChainFixture,
        AgencyFixture,
    ],
    controllers: [ChainController, AgencyController],
    exports: [ChainService, ChainFixture, AgencyFixture],
})
export class ChainModule {}
