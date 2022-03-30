import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

let app: INestApplication;
let mod: TestingModule;

describe('Users (e2e)', () => {
    beforeAll(async () => {
        mod = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = mod.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should return an empty list of users', async () => {
        return request(app.getHttpServer()).get('/users').expect(200);
    });
});
