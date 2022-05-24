import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Chain } from './chain.entity';

@Entity('chain_employee_levels')
export class ChainEmployeeLevel {
    @PrimaryColumn({ type: 'uuid' })
    public readonly id: string;

    @Column({ nullable: false, length: 128, type: 'varchar' })
    public title: string;

    @Column({ nullable: false, type: 'integer', default: 0 })
    public index: number;

    @Column({ default: true })
    public active: boolean;

    @ManyToOne(() => Chain, (chain) => chain.id)
    @JoinColumn({ name: 'chain_id' })
    chain: Chain;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date | null;

    constructor(id: string, title: string, active: boolean, chain: Chain) {
        this.id = id;
        this.title = title;
        this.active = active;
        this.chain = chain;
    }
}
