import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { CoreModule } from '../core/core.module';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './controller/employee.controller';
import { ChainModule } from '../chain/chain.module';
import { ChainService } from '../chain/application/service/chain.service';
import { Connection } from 'typeorm';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { Employee } from './entity/employee-auth.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [CoreModule, ChainModule, ConfigModule],
    providers: [
        UserService,
        {
            provide: EmployeeService,
            useFactory: (
                conn: Connection,
                uuidService: IdGeneratorService,
                chainService: ChainService,
                configService: ConfigService,
            ) => {
                return new EmployeeService(conn, uuidService, Employee, chainService, configService);
            },
            inject: [Connection, IdGeneratorService, ChainService, ConfigService],
        },
    ],
    controllers: [UserController, EmployeeController],
    exports: [UserService, EmployeeService],
})
export class UserModule {}
