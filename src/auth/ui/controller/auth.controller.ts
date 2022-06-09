import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/application/service/auth.service';
import { CreateAuthDto } from '@auth/application/dto/create-auth.dto';
import { AuthDto } from '@auth/application/dto/auth.dto';

@ApiTags('Agency')
@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @ApiResponse({ type: [AgencyDto] })
    // @Get()
    // async getAll(): Promise<AgencyDto[]> {
    //     return super.getAll();
    // }
    //
    // @ApiResponse({ type: [AgencyDto] })
    // @Get(':id')
    // async getById(@Param('id', ParseUUIDPipe) id: string): Promise<AgencyDto> {
    //     return super.getById(id);
    // }

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
