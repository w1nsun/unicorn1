import { ChainFixture } from '@root/chain/infrastructure/fixture/chain.fixture';
import { PasswordHashGenerator } from '@root/auth/application/service/password-hash-generator.service';

describe('Password hash generator', () => {
    let pwdHashGenerator: PasswordHashGenerator;
    let

    beforeEach(() => {
        pwdHashGenerator = new PasswordHashGenerator();

        const chainFixtureMock = [ChainFixture];
        chainFixture = {
            getDependencies: jest.fn().mockImplementation(() => chainFixtureMock),
        };
    });

    it('generate', async () => {});
});
