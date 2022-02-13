import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers() {
        const users = await this.userService.getAllUsers();

        return users;
    }

    @Post()
    async createUser() {
        const user = await this.userService.createUser();

        return user;
    }
}
