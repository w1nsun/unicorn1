import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entity/employee-auth.entity';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { EmployeeNotFoundException } from '../exception/employee-not-found.exception';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { ConfigService } from '@nestjs/config';
import { Chain } from '@root/chain/domain/entity/chain.entity';

@Injectable()
export class EmployeeService {
    constructor(
        private connection: Connection,
        private uuidService: IdGeneratorService,
        private entityName: EntityTarget<Employee>,
        private configService: ConfigService,
    ) {}

    async create(dto: CreateEmployeeDto): Promise<Employee> {
        const repo = this.connection.getRepository(Employee);
        const { phone, email, password, active, chainId } = { ...dto };

        // const hashedPwd = await this.passwordHashGenerator.generate(password);
        const hashedPwd = 'ssss';

        const chain = new Chain(this.uuidService.generateMongoId(), 'ddd', true);
        const entity = new Employee(this.uuidService.generateUuidV4(), hashedPwd, phone, email, active, chain);

        return await repo.save(entity);
    }

    async update(id: string, dto: UpdateEmployeeDto): Promise<Employee> {
        const repo = this.connection.getRepository(Employee);
        const entity: Employee = await this.getEmployeeById(id);

        entity.active = dto.active;
        await repo.save(entity);

        return entity;
    }

    async getEmployeeById(id: string): Promise<Employee> {
        const repo = this.connection.getRepository(Employee);
        const entity: Employee | null = await repo.findOne({
            where: { id },
        });

        if (!entity) {
            throw new EmployeeNotFoundException(`Employee ${id} not found`);
        }

        return entity;
    }
}
