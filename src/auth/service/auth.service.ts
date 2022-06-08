import { Injectable } from '@nestjs/common';
import { UuidService } from '@root/core/service/uuid.service';
import { Auth } from '@root/auth/entity/auth.entity';
import { Connection } from 'typeorm';
import { CreateAuthDto } from '@root/auth/dto/create-auth.dto';
import { PasswordHashGenerator } from "@root/auth/service/password-hash-generator.service";

@Injectable()
export class AuthService {
    constructor(
        private connection: Connection,
        private uuidService: UuidService,
        private passwordHashGenerator: PasswordHashGenerator,
    ) {}

    async create(dto: CreateAuthDto): Promise<Auth> {
        const repo = this.connection.getRepository(Auth);
        const { password, logins } = { ...dto };

        const hashedPwd = await this.passwordHashGenerator.generate(password);

        const entity = new Auth(this.uuidService.generateV4(), hashedPwd, logins);

        return await repo.save(entity);
    }
}
