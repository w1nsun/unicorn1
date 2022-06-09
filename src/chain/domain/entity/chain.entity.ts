import { Column, Entity, OneToMany } from 'typeorm';
import { Agency } from './agency.entity';
import { BaseEntity } from '@core/entity/base-entity.entity';

@Entity('chains')
export class Chain extends BaseEntity {
    @Column({ nullable: false, length: 128, type: 'varchar' })
    public title: string;

    @Column({ default: true })
    public active: boolean;

    @OneToMany(() => Agency, (agency) => agency.chain)
    public agencies: Agency[];

    constructor(id: string, title: string, active: boolean) {
        super(id);
        this.title = title;
        this.active = active;
    }
}
