import { Employee } from '@root/chain/domain/entity/employee.entity';
import { EmployeeRepository } from '@root/chain/domain/repository/employee.repository';
import { BaseRepository } from '@core/domain/repository/base.repository';

export class EmployeeMikroRepository extends BaseRepository<Employee> implements EmployeeRepository {
    async findById(id: string): Promise<Employee | null> {
        return await this.findOne({ id }, { populate: ['chain'] });
    }
}
