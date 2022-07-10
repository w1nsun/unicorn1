import { BaseRepository } from '@core/domain/repository/base.repository';
import { Employee } from '@root/chain/domain/entity/employee.entity';

export interface EmployeeRepository extends BaseRepository<Employee> {}
