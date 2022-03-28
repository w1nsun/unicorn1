import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../entity/user.entity';
import { UuidService } from '../../core/service/uuid.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        private connection: Connection,
        private uuidService: UuidService,
    ) {}

    async createUser(createUser: CreateUserDto): Promise<User> {
        const userRepo = this.connection.getRepository(User);
        const { login, password, active } = { ...createUser };
        const user = new User(
            this.uuidService.generateV4(),
            login,
            password,
            active,
        );

        return await userRepo.save(user);
    }

    async getAllUsers() {
        const userRepo = this.connection.getRepository(User);

        return await userRepo.find();
    }
}
