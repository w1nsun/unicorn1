import { ChainFixture } from '@root/chain/fixture/chain.fixture';
import { PasswordHashGenerator } from '@root/auth/service/password-hash-generator.service';

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
