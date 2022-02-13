import { Module } from '@nestjs/common';
import { UuidService } from './service/uuid.service';

@Module({
    exports: [UuidService],
    providers: [UuidService],
})
export class CoreModule {}
