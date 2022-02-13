import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn({ type: 'uuid' })
    private readonly id: string;

    @Column()
    private login: string;

    @Column()
    private password: string;

    @Column({ default: true })
    private active: boolean;

    @CreateDateColumn()
    private createdAt: Date;

    @UpdateDateColumn()
    private updatedAt: Date | null;

    constructor(id: string, login: string, password: string) {
        this.id = id;
        this.login = login;
        this.password = password;
    }

    getId(): string {
        return this.id;
    }

    getLogin(): string {
        return this.login;
    }

    setLogin(login: string): void {
        this.login = login;
    }

    isActive(): boolean {
        return this.active;
    }

    setActive(active: boolean): void {
        this.active = active;
    }
}
