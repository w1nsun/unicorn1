import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
            entities: [],
        }),
        AccountModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
