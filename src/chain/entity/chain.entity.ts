import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Agency } from './agency.entity';

@Entity('chains')
export class Chain {
    @PrimaryColumn({ type: 'uuid' })
    public readonly id: string;

    @Column({ nullable: false, length: 128, type: 'varchar' })
    public title: string;

    @Column({ default: true })
    public active: boolean;

    @OneToMany(() => Agency, (agency) => agency.chain)
    public agencies: Agency[];

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date | null;

    constructor(id: string, title: string, active: boolean) {
        this.id = id;
        this.title = title;
        this.active = active;
    }
}
