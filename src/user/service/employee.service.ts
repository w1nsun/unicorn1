import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UuidService } from '../../core/service/uuid.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entity/employee.entity';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { EmployeeNotFoundException } from '../exception/employee-not-found.exception';

@Injectable()
export class EmployeeService {
    constructor(
        private connection: Connection,
        private uuidService: UuidService,
    ) {}

    async createEmployee(dto: CreateEmployeeDto): Promise<Employee> {
        const repo = this.connection.getRepository(Employee);
        const { login, password, active } = { ...dto };
        const entity = new Employee(
            this.uuidService.generateV4(),
            login,
            password,
            active,
        );

        return await repo.save(entity);
    }

    async updateEmployee(
        id: string,
        dto: UpdateEmployeeDto,
    ): Promise<Employee> {
        const repo = this.connection.getRepository(Employee);
        const entity: Employee = await this.getEmployeeById(id);

        entity.active = dto.active;
        await repo.save(entity);

        return entity;
    }

    async getAllEmployees() {
        const repo = this.connection.getRepository(Employee);

        return await repo.find();
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
