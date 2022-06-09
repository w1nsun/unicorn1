import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entity/employee-auth.entity';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { EmployeeNotFoundException } from '../exception/employee-not-found.exception';
import { Chain } from '../../chain/domain/entity/chain.entity';
import { AbstractEntityService } from '../../core/service/abstract-entity.service';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { ChainService } from '../../chain/application/service/chain.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmployeeService extends AbstractEntityService<Employee, CreateEmployeeDto, UpdateEmployeeDto> {
    constructor(
        connection: Connection,
        uuidService: IdGeneratorService,
        entityName: EntityTarget<Employee>,
        private chainService: ChainService,
        private configService: ConfigService,
    ) {
        super(connection, uuidService, entityName);

        this.chainService = chainService;
    }

    async create(dto: CreateEmployeeDto): Promise<Employee> {
        const repo = this.connection.getRepository(Employee);
        const { phone, email, password, active, chainId } = { ...dto };

        // const hashedPwd = await this.passwordHashGenerator.generate(password);
        const hashedPwd = 'ssss';

        const chain: Chain = await this.chainService.getById(chainId);
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
