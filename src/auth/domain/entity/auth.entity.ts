import { BaseEntity } from '@core/domain/entity/base.entity';
import { Login } from '@auth/domain/entity/login.entity';
import { Embedded, Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { AuthMikroRepository } from '@auth/infrastructure/repository/auth.mikro.repository';

@Entity({ tableName: 'auth_auth', customRepository: () => AuthMikroRepository })
export class Auth extends BaseEntity {
    @Property({ nullable: false })
    password: string;

    @Property({ default: true })
    active: boolean;

    @Embedded(() => Login, { array: true })
    logins: Login[] = [];

    [EntityRepositoryType]?: AuthMikroRepository;

    constructor(id: ObjectId, password: string, logins: string[]) {
        super(id);
        this.password = password;
        this.active = true;
        logins.forEach((login) => {
            this.logins.push(new Login(login));
        });
    }
}
