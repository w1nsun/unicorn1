import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '@root/core/entity/base-entity.entity';
import { Role } from '@root/auth/entity/role.entity';
import { Login } from '@root/auth/entity/login.entity';

@Entity('auth_auth')
export class Auth extends BaseEntity {
    @Column({ nullable: false, length: 128, type: 'varchar' })
    public password: string;

    @Column({ default: true })
    public active: boolean;

    @OneToMany(() => Login, (login) => login.auth)
    public logins: Login[];

    @ManyToMany(() => Role)
    @JoinTable({ name: 'auth_auth__roles' })
    public roles: Role[];

    constructor(id: string, password: string, logins: string[]) {
        super(id);
        this.password = password;
        this.active = true;
        logins.forEach((login) => {
            this.logins.push(new Login(this, login));
        });
    }
}
