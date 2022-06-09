import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../entity/user.entity';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserNotFoundException } from '../exception/user-not-found.exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        private connection: Connection,
        private uuidService: IdGeneratorService,
        private configService: ConfigService,
    ) {}

    async createUser(createUser: CreateUserDto): Promise<User> {
        const userRepo = this.connection.getRepository(User);
        const { phone, email, password, active } = { ...createUser };

        // const hashedPwd = await this.passwordHashGenerator.generate(password);
        const hashedPwd = '222';
        const user = new User(this.uuidService.generateUuidV4(), hashedPwd, phone, email, active);

        return await userRepo.save(user);
    }

    async updateUser(id: string, updateUser: UpdateUserDto): Promise<User> {
        const userRepo = this.connection.getRepository(User);
        const user: User = await this.getUserById(id);

        user.active = updateUser.active;
        await userRepo.save(user);

        return user;
    }

    async getAllUsers() {
        const userRepo = this.connection.getRepository(User);

        return await userRepo.find();
    }

    async getUserById(id: string): Promise<User> {
        const userRepo = this.connection.getRepository(User);
        const user: User | null = await userRepo.findOne({
            where: { id },
        });

        if (!user) {
            throw new UserNotFoundException(`User ${id} not found`);
        }

        return user;
    }
}
