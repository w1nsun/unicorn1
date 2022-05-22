import { Module } from '@nestjs/common';
import { UuidService } from './service/uuid.service';

@Module({
    exports: [UuidService],
    imports: [],
    providers: [UuidService],
})
export class CoreModule {}
