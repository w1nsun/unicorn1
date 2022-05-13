import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UuidService } from '../../core/service/uuid.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entity/employee.entity';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { EmployeeNotFoundException } from '../exception/employee-not-found.exception';
import { Chain } from '../../chain/entity/chain.entity';
import { AbstractEntityService } from '../../core/service/abstract-entity.service';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { ChainService } from '../../chain/service/chain.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmployeeService extends AbstractEntityService<Employee, CreateEmployeeDto, UpdateEmployeeDto> {
    constructor(
        connection: Connection,
        uuidService: UuidService,
        entityName: EntityTarget<Employee>,
        private chainService: ChainService,
        private configService: ConfigService,
    ) {
        super(connection, uuidService, entityName);

        this.chainService = chainService;
    }

    async create(dto: CreateEmployeeDto): Promise<Employee> {
        const repo = this.connection.getRepository(Employee);
        const { login, password, active, chainId } = { ...dto };

        const hashRounds = this.configService.get<number>('PASSWORD_HASH_ROUNDS') || 2;
        const hashedPwd = await bcrypt.hash(password, hashRounds);

        const chain: Chain = await this.chainService.getById(chainId);
        const entity = new Employee(this.uuidService.generateV4(), login, hashedPwd, active, chain);

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
        const entity: Employee | undefined = await repo.findOne({
            where: { id },
        });

        if (!entity) {
            throw new EmployeeNotFoundException(`Employee ${id} not found`);
        }

        return entity;
    }
}
