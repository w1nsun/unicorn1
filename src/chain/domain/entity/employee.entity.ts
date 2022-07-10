import { BaseEntity } from '@core/domain/entity/base.entity';
import { Entity, EntityRepositoryType, ManyToOne, Property } from '@mikro-orm/core';
import { Chain } from '@root/chain/domain/entity/chain.entity';
import { EmployeeMikroRepository } from '@root/chain/infrastructure/repository/employee.mikro.repository';

@Entity({ tableName: 'chain_employees', customRepository: () => EmployeeMikroRepository })
export class Employee extends BaseEntity {
    @Property({ nullable: false })
    firstName: string;

    @Property({ nullable: false })
    lastName: string;

    @ManyToOne({ entity: () => Chain })
    chain: Chain;

    [EntityRepositoryType]?: EmployeeMikroRepository;
}
