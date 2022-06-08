import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from '@root/auth/entity/auth.entity';

@Entity('auth_login')
export class Login {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ nullable: false, length: 128, type: 'varchar' })
    public login: string;

    @ManyToOne(() => Auth, (auth) => auth.logins)
    public auth: Auth;

    constructor(auth: Auth, login: string) {
        this.auth = auth;
        this.login = login;
    }
}
