import { Connection } from 'typeorm';
import { UuidService } from '../../core/service/uuid.service';
import { Chain } from '../entity/chain.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChainFixture {
    constructor(private connection: Connection, private uuidService: UuidService) {}

    async load() {
        console.log('__before load');
        const res = await this.connection
            .createQueryBuilder()
            .insert()
            .into(Chain)
            .values([
                {
                    id: this.uuidService.generateV4(),
                    title: 'Test from fixture',
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ])
            .execute();

        console.log(res);
    }
}
