import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { AbstractEntityController } from '../../core/controller/abstract-entity.controller';
import { ChainService } from '../service/chain.service';
import { Chain } from '../entity/chain.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Agency } from '../entity/agency.entity';
import { AgencyDto } from '../dto/agency.dto';
import { UpdateAgencyDto } from '../dto/update-agency.dto';
import { CreateAgencyDto } from '../dto/create-agency.dto';

@ApiTags('Agency')
@Controller('/agency')
export class AgencyController extends AbstractEntityController<
    Agency,
    AgencyDto,
    UpdateAgencyDto,
    CreateAgencyDto
> {
    constructor(agencyService: ChainService) {
        super(agencyService, function (entity: Chain) {
            return AgencyDto.fromEntity(entity);
        });
    }

    @ApiResponse({ type: [AgencyDto] })
    @Get()
    async getAll(): Promise<AgencyDto[]> {
        return super.getAll();
    }

    @ApiResponse({ type: [AgencyDto] })
    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<AgencyDto> {
        return super.getById(id);
    }

    @ApiBody({ type: CreateAgencyDto })
    @ApiResponse({ type: AgencyDto })
    @Post()
    async create(@Body() dto: CreateAgencyDto): Promise<AgencyDto> {
        return super.create(dto);
    }

    @ApiBody({ type: UpdateAgencyDto })
    @ApiResponse({ type: AgencyDto })
    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateAgencyDto,
    ): Promise<AgencyDto> {
        return super.update(id, dto);
    }
}
