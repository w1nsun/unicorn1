import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateChainDto } from '../../application/dto/create-chain.dto';
import { UpdateChainDto } from '../../application/dto/update-chain.dto';
import { ChainService } from '../../application/service/chain.service';
import { Chain } from '../../domain/entity/chain.entity';
import { ChainDto } from '../../application/dto/chain.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chain')
@Controller('/chain')
export class ChainController {
    constructor(private readonly chainService: ChainService) {}

    // @ApiResponse({ type: [ChainDto] })
    // @Get()
    // async getAll(): Promise<ChainDto[]> {
    //     return super.getAll();
    // }

    @ApiResponse({ type: [ChainDto] })
    @Get(':id')
    async getById(@Param('id') id: string): Promise<ChainDto> {
        const chain = await this.chainService.findById(id);
        if (!chain) {
            throw new HttpException('Chain not found!', HttpStatus.NOT_FOUND);
        }

        console.log(chain.agencies);
        for (const agency of chain.agencies) {
            console.log(agency.title);
        }

        return ChainDto.fromEntity(chain);
    }

    @ApiBody({ type: CreateChainDto })
    @ApiResponse({ type: ChainDto })
    @Post()
    async create(@Body() dto: CreateChainDto): Promise<ChainDto> {
        const chain = await this.chainService.create(dto);

        return ChainDto.fromEntity(chain);
    }

    @ApiBody({ type: UpdateChainDto })
    @ApiResponse({ type: ChainDto })
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateChainDto): Promise<ChainDto> {
        const chain = await this.chainService.update(id, dto);

        return ChainDto.fromEntity(chain);
    }
}
