import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from '../../src/app.module';
import { Connection } from 'typeorm';

let app: INestApplication;
let mod: TestingModule;
let connection: Connection;

const loadFixtures = async (sqlFileName: string) => {
    const sql = fs.readFileSync(
        path.join(__dirname, 'fixtures', sqlFileName),
        'utf-8',
    );

    const queryRunner = connection.driver.createQueryRunner('master');

    for (const c of sql.split(';')) {
        await queryRunner.query(c);
    }
};

describe('Users (e2e)', () => {
    beforeAll(async () => {
        mod = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = mod.createNestApplication();
        await app.init();

        connection = app.get(Connection);
    });

    afterAll(async () => {
        await app.close();
    });

    it('should return an empty list of users', async () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .then((response) => {
                expect(response.body.length).toBe(0);
            });
    });

    it('should return 1 user in list', async () => {
        await loadFixtures('1-user.sql');
        return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .then((response) => {
                expect(response.body.length).toBe(1);
            });
    });
});
