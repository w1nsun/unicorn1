//https://stackoverflow.com/questions/65250657/using-services-inside-nestjs-script-run-from-command-line
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ChainFixture } from './chain/fixture/chain.fixture';
import { AgencyFixture } from './chain/fixture/agency.fixture';

async function bootstrap() {
    const application = await NestFactory.createApplicationContext(AppModule);

    application.enableShutdownHooks();

    const command = process.argv[2];

    switch (command) {
        case 'fixtures-load':
            const chainFixture: ChainFixture = application.get(ChainFixture);
            const agencyFixture: AgencyFixture = application.get(AgencyFixture);

            await chainFixture.load();
            await agencyFixture.load();
            break;
        default:
            console.log('Command not found');
            process.exit(1);
    }

    await application.close();
    process.exit(0);
}

bootstrap();
