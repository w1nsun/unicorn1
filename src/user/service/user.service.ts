import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../entity/user.entity';
import { UuidService } from '../../core/service/uuid.service';

@Injectable()
export class UserService {
    constructor(
        private connection: Connection,
        private uuidService: UuidService,
    ) {}

    async createUser(): Promise<User> {
        const userRepo = this.connection.getRepository(User);
        const user = new User(this.uuidService.generateV4(), 'test1', 'pwd');

        return await userRepo.save(user);
    }

    async getAllUsers() {
        const userRepo = this.connection.getRepository(User);

        return await userRepo.find();
    }
}
