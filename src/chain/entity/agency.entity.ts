import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('agencies')
export class Agency {
    @PrimaryColumn({ type: 'uuid' })
    public readonly id: string;

    @Column({ nullable: false, length: 128, type: 'varchar' })
    public title: string;

    @Column({ default: true })
    public active: boolean;

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
