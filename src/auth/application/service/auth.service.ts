import { Injectable } from '@nestjs/common';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { Auth } from '@auth/domain/entity/auth.entity';
import { CreateAuthDto } from '@auth/application/dto/create-auth.dto';
import { PasswordHashGenerator } from '@auth/application/service/password-hash-generator.service';
import { AuthRepository } from '@auth/domain/repository/auth.repository';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly idGeneratorService: IdGeneratorService,
        private readonly passwordHashGenerator: PasswordHashGenerator,
        @InjectRepository(Auth) private readonly authRepo: AuthRepository,
    ) {}

    async create(dto: CreateAuthDto): Promise<Auth> {
        const { password, logins } = { ...dto };

        const hashedPwd = await this.passwordHashGenerator.generate(password);
        const auth = new Auth(this.idGeneratorService.generateMongoId(), hashedPwd, logins);
        await this.authRepo.save(auth);

        return auth;
    }

    async getById(id: string) {
        const auth = await this.authRepo.findById(id);
        if (auth) {
            return auth;
        }

        throw new Error('not Found');
    }
}
