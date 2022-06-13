import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { AuthService } from '@auth/application/service/auth.service';
import { PasswordHashGenerator } from '@auth/application/service/password-hash-generator.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '@auth/ui/controller/auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Auth } from '@auth/domain/entity/auth.entity';

// example with Symbol https://stackoverflow.com/questions/52969037/nestjs-dependency-injection-and-ddd-clean-architecture

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [Auth] }), CoreModule, ConfigModule],
    providers: [AuthService, PasswordHashGenerator],
    controllers: [AuthController],
    exports: [AuthService, PasswordHashGenerator],
})
export class AuthModule {}
