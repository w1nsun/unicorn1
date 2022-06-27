import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Agency } from '../../domain/entity/agency.entity';
import { AgencyDto } from '../../application/dto/agency.dto';
import { UpdateAgencyDto } from '../../application/dto/update-agency.dto';
import { CreateAgencyDto } from '../../application/dto/create-agency.dto';
import { AgencyService } from '../../application/service/agency.service';

@ApiTags('Agency')
@Controller('/agency')
export class AgencyController {
    constructor(private readonly agencyService: AgencyService) {}

    // @ApiResponse({ type: [AgencyDto] })
    // @Get()
    // async getAll(): Promise<AgencyDto[]> {
    //     return super.getAll();
    // }

    @ApiResponse({ type: [AgencyDto] })
    @Get(':id')
    async getById(@Param('id') id: string): Promise<AgencyDto> {
        const agency = await this.agencyService.findById(id);
        if (!agency) {
            throw new HttpException('Agency not found!', HttpStatus.NOT_FOUND);
        }

        return AgencyDto.fromEntity(agency);
    }

    @ApiBody({ type: CreateAgencyDto })
    @ApiResponse({ type: AgencyDto })
    @Post()
    async create(@Body() dto: CreateAgencyDto): Promise<AgencyDto> {
        const agency = await this.agencyService.create(dto);

        return AgencyDto.fromEntity(agency);
    }

    @ApiBody({ type: UpdateAgencyDto })
    @ApiResponse({ type: AgencyDto })
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateAgencyDto): Promise<AgencyDto> {
        const agency = await this.agencyService.update(id, dto);

        return AgencyDto.fromEntity(agency);
    }
}
