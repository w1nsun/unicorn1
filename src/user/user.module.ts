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

@Module({
    imports: [CoreModule, ChainModule],
    providers: [
        UserService,
        {
            provide: EmployeeService,
            useFactory: (
                conn: Connection,
                uuidService: UuidService,
                chainService: ChainService,
            ) => {
                return new EmployeeService(
                    conn,
                    uuidService,
                    Employee,
                    chainService,
                );
            },
            inject: [Connection, UuidService, ChainService],
        },
    ],
    controllers: [UserController, EmployeeController],
    exports: [UserService, EmployeeService],
})
export class UserModule {}
