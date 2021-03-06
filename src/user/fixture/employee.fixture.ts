import { Connection } from 'typeorm';
import { IdGeneratorService } from '@core/service/id-generator.service';
import * as moment from 'moment';
import { IFixture } from '../../fixture/ifixture.fixture';
import { Employee } from '../entity/employee-auth.entity';
import { ChainFixture } from '../../chain/infrastructure/fixture/chain.fixture';
import { ConfigService } from '@nestjs/config';
import { PasswordHashGenerator } from '@root/auth/application/service/password-hash-generator.service';

// @Injectable()
export class EmployeeFixture implements IFixture {
    constructor(
        private connection: Connection,
        private uuidService: IdGeneratorService,
        private configService: ConfigService,
        private passwordHashGenerator: PasswordHashGenerator,
    ) {}

    async load(): Promise<void> {
        const yesterday: Date = moment().subtract(1, 'day').toDate();
        //
        // try {
        //     const employees: Employee[] = [];
        //     for (let i = 0; i < 100; i++) {
        //         const password = faker.internet.password(16);
        //         const hashedPwd = await this.passwordHashGenerator.generate(password);
        //         const chainId = _.sample([ChainFixture.ID_SPORT_LIFE, ChainFixture.ID_365_STUDIO]);
        //
        //         employees.push({
        //             id: this.uuidService.generateUuidV4(),
        //             phone: faker.phone.phoneNumber('38##########'),
        //             email: faker.internet.exampleEmail(),
        //             password: hashedPwd,
        //             active: true,
        //             chain: { id: chainId } as Chain,
        //             createdAt: yesterday,
        //             updatedAt: yesterday,
        //         });
        //     }
        //     await this.connection.createQueryBuilder().insert().into(Employee).values(employees).execute();
        // } catch (err) {
        //     console.log('Err:', err);
        // }
    }

    async cleanDB(): Promise<void> {
        const repo = await this.connection.getRepository(Employee);
        const tableName = repo.metadata.tableName;
        await repo.query(`TRUNCATE ${tableName} RESTART IDENTITY CASCADE;`);
    }

    getDependencies() {
        return [ChainFixture];
    }
}
