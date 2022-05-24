import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn({ type: 'uuid' })
    public readonly id: string;

    @Column()
    public password: string;

    @Column({ nullable: false, length: 32, type: 'varchar' })
    public phone: string;

    @Column({ nullable: false, length: 128, type: 'varchar' })
    public email: string;

    @Column({ default: true })
    public active: boolean;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date | null;

    constructor(id: string, password: string, phone: string, email: string, active: boolean) {
        this.id = id;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.active = active;
    }
}
