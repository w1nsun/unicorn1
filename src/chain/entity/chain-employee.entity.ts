import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Chain } from './chain.entity';
import { Employee } from '../../user/entity/employee.entity';
import { EmployeePosition } from './employee-position.entity';

@Entity('chain_employees')
export class ChainEmployee {
    @PrimaryColumn({ type: 'uuid' })
    public readonly id: string;

    @Column({ nullable: false, length: 128, type: 'varchar' })
    public title: string;

    @ManyToOne(() => Employee, (employee) => employee.id)
    @JoinColumn({ name: 'employee_id' })
    public employee: Employee;

    @ManyToMany(() => EmployeePosition)
    @JoinTable({ name: 'chain_employee__employee_positions' })
    public employeePositions: EmployeePosition[];

    @ManyToOne(() => Chain, (chain) => chain.id)
    @JoinColumn({ name: 'chain_id' })
    public chain: Chain;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date | null;

    constructor(id: string, title: string, chain: Chain) {
        this.id = id;
        this.title = title;
        this.chain = chain;
    }
}
