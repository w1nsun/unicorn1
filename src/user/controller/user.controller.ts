import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Param,
    BadRequestException,
    ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserNotFoundException } from '../exception/user-not-found.exception';

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers(): Promise<UserDto[]> {
        const users = await this.userService.getAllUsers();

        return users.map((entity: User) => UserDto.fromEntity(entity));
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        const user = await this.userService.createUser(createUserDto);

        return UserDto.fromEntity(user);
    }

    @Put(':id')
    async updateUser(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserDto> {
        try {
            const user = await this.userService.updateUser(id, updateUserDto);
            return UserDto.fromEntity(user);
        } catch (error) {
            console.log(error);
            if (error instanceof UserNotFoundException) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException('www');
        }
    }
}
