import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers() {
        const users = await this.userService.getAllUsers();

        return users;
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userService.createUser(createUserDto);

        return user;
    }
}
