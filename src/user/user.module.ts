import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { CoreModule } from '../core/core.module';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './controller/employee.controller';
import { ChainModule } from '../chain/chain.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [CoreModule, ChainModule, ConfigModule],
    providers: [
        UserService,
        EmployeeService,
    ],
    controllers: [UserController, EmployeeController],
    exports: [UserService, EmployeeService],
})
export class UserModule {}
