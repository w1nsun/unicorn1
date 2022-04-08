import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserNotFoundException } from '../exception/user-not-found.exception';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers(): Promise<UserDto[]> {
        const users = await this.userService.getAllUsers();

        return users.map((entity: User) => UserDto.fromEntity(entity));
    }

    @Get(':id')
    async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
        try {
            const user = await this.userService.getUserById(id);
            return UserDto.fromEntity(user);
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException();
        }
    }

    @ApiOperation({ summary: 'Create User' })
    @ApiResponse({ type: UserDto })
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
            if (error instanceof UserNotFoundException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException();
        }
    }
}
