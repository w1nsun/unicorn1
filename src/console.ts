//https://stackoverflow.com/questions/65250657/using-services-inside-nestjs-script-run-from-command-line
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FixtureLoader } from './fixture/service/fixture-loader.service';

async function bootstrap() {
    const application = await NestFactory.createApplicationContext(AppModule);

    application.enableShutdownHooks();

    const command = process.argv[2];

    switch (command) {
        case 'fixtures-load':
            const fixtureLoader: FixtureLoader = application.get(FixtureLoader);

            await fixtureLoader.load();
            break;
        default:
            console.log('Command not found');
            process.exit(1);
    }

    await application.close();
    process.exit(0);
}

bootstrap();
