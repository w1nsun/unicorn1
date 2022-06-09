import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ChainEmployeeLevel } from './chain-employee-level.entity';
import { ChainPosition } from './chain-position.entity';

@Entity('employee_positions')
export class EmployeePosition {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    // @ManyToMany(() => Service)
    // @JoinTable({ name: 'position_services' })
    // public services: Service[];
    //
    // @ManyToMany(() => ServiceCategory)
    // @JoinTable({ name: 'position_service_categories' })
    // public serviceCategories: ServiceCategory[];

    @ManyToOne(() => ChainPosition, (chainPosition) => chainPosition.id)
    @JoinColumn({ name: 'chain_position_id' })
    public chainPosition: ChainPosition;

    @ManyToOne(() => ChainEmployeeLevel, (chainEmployeeLevel) => chainEmployeeLevel.id)
    @JoinColumn({ name: 'chain_employee_level_id' })
    public chainEmployeeLevel: ChainEmployeeLevel;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date | null;
}
