import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { CoreModule } from '../core/core.module';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './controller/employee.controller';
import { ChainModule } from '../chain/chain.module';
import { ChainService } from '../chain/service/chain.service';
import { Connection } from 'typeorm';
import { UuidService } from '../core/service/uuid.service';
import { Employee } from './entity/employee.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PasswordHashGenerator } from './service/password-hash-generator.service';
import { EmployeeFixture } from './fixture/employee.fixture';

@Module({
    imports: [CoreModule, ChainModule, ConfigModule],
    providers: [
        UserService,
        PasswordHashGenerator,
        EmployeeFixture,
        {
            provide: EmployeeService,
            useFactory: (
                conn: Connection,
                uuidService: UuidService,
                chainService: ChainService,
                configService: ConfigService,
                passwordHashGenerator: PasswordHashGenerator,
            ) => {
                return new EmployeeService(
                    conn,
                    uuidService,
                    Employee,
                    chainService,
                    configService,
                    passwordHashGenerator,
                );
            },
            inject: [Connection, UuidService, ChainService, ConfigService, PasswordHashGenerator],
        },
    ],
    controllers: [UserController, EmployeeController],
    exports: [UserService, EmployeeService, PasswordHashGenerator, EmployeeFixture],
})
export class UserModule {}
