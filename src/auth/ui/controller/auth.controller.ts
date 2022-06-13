import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/application/service/auth.service';
import { CreateAuthDto } from '@auth/application/dto/create-auth.dto';
import { AuthDto } from '@auth/application/dto/auth.dto';

@ApiTags('Agency')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @ApiResponse({ type: [AgencyDto] })
    // @Get()
    // async getAll(): Promise<AgencyDto[]> {
    //     return super.getAll();
    // }

    @ApiResponse({ type: [AuthDto] })
    @Get(':id')
    async getById(@Param('id') id: string): Promise<AuthDto> {
        const auth = await this.authService.getById(id);

        return AuthDto.fromEntity(auth);
    }

    @ApiBody({ type: CreateAuthDto })
    @ApiResponse({ type: AuthDto })
    @Post()
    async create(@Body() dto: CreateAuthDto): Promise<AuthDto> {
        const auth = await this.authService.create(dto);

        return AuthDto.fromEntity(auth);
    }

    // @ApiBody({ type: UpdateAgencyDto })
    // @ApiResponse({ type: AgencyDto })
    // @Put(':id')
    // async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAgencyDto): Promise<AgencyDto> {
    //     return super.update(id, dto);
    // }
}
