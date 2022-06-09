import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class Login {
    @Property()
    login: string;

    @Property()
    createdAt: Date;

    constructor(login: string) {
        this.login = login;
        this.createdAt = new Date();
    }
}
