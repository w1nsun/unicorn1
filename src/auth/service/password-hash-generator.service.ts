import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordHashGenerator {
    constructor(private configService: ConfigService<{ PASSWORD_HASH_ROUNDS: number }, true>) {}

    async generate(password: string) {
        const hashRounds = this.configService.get('PASSWORD_HASH_ROUNDS', { infer: true });
        return await bcrypt.hash(password, Number(hashRounds));
    }
}
