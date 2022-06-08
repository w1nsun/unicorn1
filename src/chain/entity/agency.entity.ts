import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Chain } from './chain.entity';
import { BaseEntity } from '@root/core/entity/base-entity.entity';

@Entity('agencies')
export class Agency extends BaseEntity {
    @Column({ nullable: false, length: 128, type: 'varchar' })
    public title: string;

    @Column({ default: true })
    public active: boolean;

    @ManyToOne(() => Chain, (chain) => chain.id)
    @JoinColumn({ name: 'chain_id' })
    public chain: Chain;

    constructor(id: string, title: string, chain: Chain) {
        super(id);
        this.title = title;
        this.active = true;
        this.chain = chain;
    }
}
