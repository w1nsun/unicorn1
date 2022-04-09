import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { CreateChainDto } from '../dto/create-chain.dto';
import { UpdateChainDto } from '../dto/update-chain.dto';
import { AbstractEntityController } from '../../core/controller/abstract-entity.controller';
import { ChainService } from '../service/chain.service';
import { Chain } from '../entity/chain.entity';
import { ChainDto } from '../dto/chain.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chain')
@Controller('/chain')
export class ChainController extends AbstractEntityController<
    Chain,
    ChainDto,
    UpdateChainDto,
    CreateChainDto
> {
    constructor(employeeService: ChainService) {
        super(employeeService, function (entity: Chain) {
            return ChainDto.fromEntity(entity);
        });
    }

    @ApiResponse({ type: [ChainDto] })
    @Get()
    async getAll(): Promise<ChainDto[]> {
        return super.getAll();
    }

    @ApiResponse({ type: [ChainDto] })
    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<ChainDto> {
        return super.getById(id);
    }

    @ApiBody({ type: CreateChainDto })
    @ApiResponse({ type: ChainDto })
    @Post()
    async create(@Body() dto: CreateChainDto): Promise<ChainDto> {
        return super.create(dto);
    }

    @ApiBody({ type: UpdateChainDto })
    @ApiResponse({ type: ChainDto })
    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateChainDto,
    ): Promise<ChainDto> {
        return super.update(id, dto);
    }
}
