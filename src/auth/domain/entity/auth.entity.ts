import { BaseEntity } from '@core/domain/entity/base.entity';
import { Login } from '@auth/domain/entity/login.entity';
import { Embedded, Entity, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ tableName: 'auth_auth' })
export class Auth extends BaseEntity {
    @Property({ nullable: false })
    password: string;

    @Property({ default: true })
    active: boolean;

    @Embedded(() => Login, { array: true })
    logins: Login[] = [];

    constructor(id: ObjectId, password: string, logins: string[]) {
        super(id);
        this.password = password;
        this.active = true;
        logins.forEach((login) => {
            this.logins.push(new Login(login));
        });
    }
}
