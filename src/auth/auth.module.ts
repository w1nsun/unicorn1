import { Module } from '@nestjs/common';
import { CoreModule } from '@root/core/core.module';
import { AuthService } from '@root/auth/service/auth.service';
import { PasswordHashGenerator } from '@root/auth/service/password-hash-generator.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [CoreModule, ConfigModule],
    providers: [AuthService, PasswordHashGenerator],
    controllers: [],
    exports: [AuthService, PasswordHashGenerator],
})
export class AuthModule {}
