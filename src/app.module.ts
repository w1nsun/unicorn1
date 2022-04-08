import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { User } from './user/entity/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ChainModule } from './chain/chain.module';
import { Employee } from './user/entity/employee.entity';
import { Chain } from './chain/entity/chain.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: process.env.NODE_ENV
                ? `.${process.env.NODE_ENV}.env`
                : '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            synchronize: true,
            host: process.env.POSTGRES_HOST,
            entities: [User, Employee, Chain],
            namingStrategy: new SnakeNamingStrategy(),
            dropSchema: Boolean(
                parseInt(
                    process.env.DB_DROP_SCHEMA !== undefined
                        ? process.env.DB_DROP_SCHEMA
                        : '0',
                ),
            ),
        }),
        CoreModule,
        UserModule,
        ChainModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
