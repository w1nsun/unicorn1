import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../entity/user.entity';
import { UuidService } from '../../core/service/uuid.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserNotFoundException } from '../exception/user-not-found.exception';

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

    async updateUser(id: string, updateUser: UpdateUserDto): Promise<User> {
        const userRepo = this.connection.getRepository(User);
        const user: User | undefined = await userRepo.findOne({
            where: { id },
        });

        if (!user) {
            throw new UserNotFoundException(`User ${id} not found`);
        }

        user.active = updateUser.active;
        await userRepo.save(user);

        return user;
    }

    async getAllUsers() {
        const userRepo = this.connection.getRepository(User);

        return await userRepo.find();
    }
}
