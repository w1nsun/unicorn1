import { EntityRepository } from '@mikro-orm/mongodb';
import { Employee } from '@root/chain/domain/entity/employee.entity';
import { EmployeeRepository } from '@root/chain/domain/repository/employee.repository';

export class EmployeeMikroRepository extends EntityRepository<Employee> implements EmployeeRepository {
    async findById(id: string): Promise<Employee | null> {
        return await this.findOne({ id }, { populate: ['chain'] });
    }

    async save(entity: Employee): Promise<void> {
        await this.em.persistAndFlush(entity);
    }
}
