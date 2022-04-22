//https://stackoverflow.com/questions/65250657/using-services-inside-nestjs-script-run-from-command-line
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ChainFixture } from './chain/fixture/chain.fixture';

async function bootstrap() {
    const application = await NestFactory.createApplicationContext(AppModule);

    const command = process.argv[2];

    switch (command) {
        case 'fixtures-load':
            const chainFixture: ChainFixture = application.get(ChainFixture);

            await chainFixture.load();
            console.log('Loaded');
            break;
        default:
            console.log('Command not found');
            process.exit(1);
    }

    await application.close();
    process.exit(0);
}

bootstrap();
