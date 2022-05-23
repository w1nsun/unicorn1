import { Connection } from 'typeorm';
import { UuidService } from '../../core/service/uuid.service';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { IFixture } from '../../fixture/ifixture.fixture';
import { Employee } from '../entity/employee.entity';
import { Chain } from '../../chain/entity/chain.entity';
import { ChainFixture } from '../../chain/fixture/chain.fixture';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmployeeFixture implements IFixture {
    public static readonly ID_SL_DEMIIVSKA = 'a5a14eb6-e4ff-471e-babc-0d1cab7df93a';
    public static readonly ID_SL_PECHERSK = '4cfb2c51-4a7d-4f0a-a9ff-6c0ca5d3769a';
    public static readonly ID_SL_PODIL = '621f40b6-c8d0-4947-b5b2-8bd6061b65cc';
    public static readonly ID_365_CENTER = '54a6f582-c1d4-4ee7-90c4-c759e7ef2dc9';
    public static readonly ID_365_LUKIANIVSKA = '8bc0d0d8-1474-41ae-a471-888a04461186';

    constructor(
        private connection: Connection,
        private uuidService: UuidService,
        private configService: ConfigService,
    ) {}

    async load(): Promise<void> {
        const yesterday: Date = moment().subtract(1, 'day').toDate();

        const employees: Employee[] = [];
        for (let i = 0; i < 100; i++) {
            const hashRounds = this.configService.get<number>('PASSWORD_HASH_ROUNDS') || 2;
            const hashedPwd = await bcrypt.hash(faker.internet.password(), hashRounds);

            employees.push({
                id: this.uuidService.generateV4(),
                login: faker.internet.userName(),
                password: hashedPwd,
                active: true,
                chain: { id: ChainFixture.ID_SPORT_LIFE } as Chain,
                createdAt: yesterday,
                updatedAt: yesterday,
            });
        }

        await this.connection.createQueryBuilder().insert().into(Employee).values(employees).execute();
    }

    async cleanDB(): Promise<void> {
        const repo = await this.connection.getRepository(Employee);
        const tableName = await repo.metadata.tableName;
        await repo.query(`TRUNCATE ${tableName} RESTART IDENTITY CASCADE;`);
    }

    getDependencies() {
        return [ChainFixture];
    }
}
