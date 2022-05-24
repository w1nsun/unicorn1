import { Column, Entity } from 'typeorm';
import { Chain } from './chain.entity';
import { BaseActive } from '../../core/entity/base-active.entity';

@Entity('agencies')
export class Agency extends BaseActive {
    @Column({ nullable: false, length: 128, type: 'varchar' })
    public title: string;

    constructor(id: string, title: string, chain: Chain) {
        super(id, chain);
        this.title = title;
    }
}
