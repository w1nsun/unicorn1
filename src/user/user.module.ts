import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { CoreModule } from '../core/core.module';
import { EmployeeService } from './service/employee.service';

@Module({
    imports: [CoreModule],
    providers: [UserService, EmployeeService],
    controllers: [UserController],
    exports: [UserService, EmployeeService],
})
export class UserModule {}
