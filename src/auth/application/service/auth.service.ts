import { Injectable } from '@nestjs/common';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { Auth } from '@auth/domain/entity/auth.entity';
import { CreateAuthDto } from '@auth/application/dto/create-auth.dto';
import { PasswordHashGenerator } from '@auth/application/service/password-hash-generator.service';
import { EntityManager } from '@mikro-orm/mongodb';

@Injectable()
export class AuthService {
    constructor(
        private em: EntityManager,
        private idGeneratorService: IdGeneratorService,
        private passwordHashGenerator: PasswordHashGenerator,
    ) {}

    async create(dto: CreateAuthDto): Promise<Auth> {
        const { password, logins } = { ...dto };

        const hashedPwd = await this.passwordHashGenerator.generate(password);
        const auth = new Auth(this.idGeneratorService.generateMongoId(), hashedPwd, logins);
        const repo = this.em.getRepository(Auth);
        await repo.persistAndFlush(auth);

        return auth;
    }
}
