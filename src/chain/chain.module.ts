import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ChainService } from './service/chain.service';
import { ChainController } from './controller/chain.controller';
import { Connection } from 'typeorm';
import { UuidService } from '../core/service/uuid.service';
import { Chain } from './entity/chain.entity';
import { AgencyController } from './controller/agency.controller';
import { ChainExistsValidator } from './validator/chain-exists/chain-exists.validator';

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
        ChainExistsValidator,
    ],
    controllers: [ChainController, AgencyController],
    exports: [ChainService],
})
export class ChainModule {}
