import { Module } from '@nestjs/common';
import { IdGeneratorService } from './service/id-generator.service';

@Module({
    exports: [IdGeneratorService],
    imports: [],
    providers: [IdGeneratorService],
})
export class CoreModule {}
