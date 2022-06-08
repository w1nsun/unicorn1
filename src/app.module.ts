import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ChainModule } from './chain/chain.module';
import { Employee } from './user/entity/employee-auth.entity';
import { Chain } from './chain/entity/chain.entity';
import { Agency } from './chain/entity/agency.entity';
import { CoreModule } from './core/core.module';
import { FixtureModule } from './fixture/fixture.module';
import { Service } from './chain/entity/service.entity';
import { ServiceCategory } from './chain/entity/service-category.entity';
import { AuthModule } from '@root/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env',
            cache: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            synchronize: true,
            host: process.env.POSTGRES_HOST,
            entities: [User, Employee, Chain, Agency, Service, ServiceCategory],
            namingStrategy: new SnakeNamingStrategy(),
            dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA !== undefined ? process.env.DB_DROP_SCHEMA : '0')),
        }),
        CoreModule,
        UserModule,
        ChainModule,
        AuthModule,
        FixtureModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
