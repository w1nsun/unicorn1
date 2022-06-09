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
import { Service } from './service.entity';
import { ServiceCategory } from './service-category.entity';

@Entity('chain_positions')
export class ChainPosition {
    @PrimaryColumn({ type: 'uuid' })
    public readonly id: string;

    @Column({ nullable: false, length: 128, type: 'varchar' })
    public title: string;

    @ManyToMany(() => Service)
    @JoinTable({ name: 'chain_position__services' })
    public services: Service[];

    @ManyToMany(() => ServiceCategory)
    @JoinTable({ name: 'chain_position__service_categories' })
    public serviceCategories: ServiceCategory[];

    @Column({ default: true })
    public active: boolean;

    @ManyToOne(() => Chain, (chain) => chain.id)
    @JoinColumn({ name: 'chain_id' })
    public chain: Chain;

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
