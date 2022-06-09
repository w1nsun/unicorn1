import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { AuthService } from '@auth/application/service/auth.service';
import { PasswordHashGenerator } from '@auth/application/service/password-hash-generator.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '@auth/ui/controller/auth.controller';

@Module({
    imports: [CoreModule, ConfigModule],
    providers: [AuthService, PasswordHashGenerator],
    controllers: [AuthController],
    exports: [AuthService, PasswordHashGenerator],
})
export class AuthModule {}
