import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { IFixture } from '../ifixture.fixture';
@Injectable()
export class FixtureLoader {
    constructor(private connection: Connection, private fixtures: IFixture[] = []) {}

    async load() {
        this.cleanDB();

        for (const fixture of this.fixtures) {
            await fixture.load();
        }
    }

    //https://blog.tooljet.com/clearing-tables-before-each-test-nestjs-typeorm/
    async cleanDB() {
        // await this.connection.manager.query('SET FOREIGN_KEY_CHECKS = 0');
        await this.connection.manager.query('SET session_replication_role = replica;');
        for (const fixture of this.fixtures) {
            await fixture.cleanDB();
        }
        // await this.connection.manager.query('SET FOREIGN_KEY_CHECKS = 1');
        await this.connection.manager.query('SET session_replication_role = DEFAULT;');
    }
}
