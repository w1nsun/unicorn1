import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('employees')
export class Employee {
    @PrimaryColumn({ type: 'uuid' })
    public readonly id: string;

    @Column()
    public login: string;

    @Column()
    public password: string;

    @Column({ default: true })
    public active: boolean;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date | null;

    constructor(id: string, login: string, password: string, active: boolean) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.active = active;
    }
}
