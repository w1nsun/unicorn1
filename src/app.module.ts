import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@core/core.module';
import { AuthModule } from '@auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env',
            cache: true,
        }),
        MikroOrmModule.forRoot({
            type: 'mongo',
            // port: Number(process.env.POSTGRES_PORT),
            // username: process.env.POSTGRES_USER,
            // user: process.env.MONGODB_USER,
            // password: process.env.MONGODB_PASSWORD,
            dbName: process.env.MONGODB_DATABASE,
            // host: process.env.POSTGRES_HOST,
            // clientUrl: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
            // clientUrl: `mongodb://localhost:27017`,
            clientUrl: `mongodb://root:example@localhost:27017`,
            // useNewUrlParser: true,
            // synchronize: true,
            // useUnifiedTopology: true,
            // logging: true,
            // ssl: true,
            entities: [],
        }),
        // TypeOrmModule.forRoot({
        //     type: 'mongodb',
        //     port: Number(process.env.MONGODB_PORT),
        //     username: process.env.MONGODB_USER,
        //     password: process.env.MONGODB_PASSWORD,
        //     database: process.env.MONGODB_DATABASE,
        //     host: process.env.MONGODB_HOST,
        //     entities: [],
        //     useNewUrlParser: true,
        //     synchronize: true,
        //     useUnifiedTopology: true,
        //     logging: true,
        //     ssl: true,
        // }),
        CoreModule,
        // UserModule,
        // ChainModule,
        AuthModule,
        // FixtureModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
