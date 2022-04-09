import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { CoreModule } from '../core/core.module';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './controller/employee.controller';

@Module({
    imports: [CoreModule],
    providers: [UserService, EmployeeService],
    controllers: [UserController, EmployeeController],
    exports: [UserService, EmployeeService],
})
export class UserModule {}
