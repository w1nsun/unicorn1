import {
    BadRequestException,
    Body,
    Get,
    InternalServerErrorException,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { AbstractEntityService } from '../service/abstract-entity.service';
import { DtoFactoryType } from '../type/dto-factory.type';
import { EntityNotFoundException } from '../exception/entity-not-found.exception';

export abstract class AbstractEntityController<
    TEntity,
    TDto,
    TCreateDto,
    TUpdateDto,
> {
    protected constructor(
        protected service: AbstractEntityService<
            TEntity,
            TCreateDto,
            TUpdateDto
        >,
        protected dtoFactoryMethod: DtoFactoryType<TEntity, TDto>,
    ) {}

    @Get()
    async getAll(): Promise<TDto[]> {
        const entities = await this.service.getAll();

        return entities.map((entity: TEntity) => this.dtoFactoryMethod(entity));
    }

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<TDto> {
        try {
            const entity = await this.service.getById(id);
            return this.dtoFactoryMethod(entity);
        } catch (error) {
            if (error instanceof EntityNotFoundException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException();
        }
    }

    @Post()
    async create(@Body() dto: TCreateDto): Promise<TDto> {
        const entity = await this.service.create(dto);

        return this.dtoFactoryMethod(entity);
    }

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: TUpdateDto,
    ): Promise<TDto> {
        try {
            const entity = await this.service.update(id, dto);
            return this.dtoFactoryMethod(entity);
        } catch (error) {
            if (error instanceof EntityNotFoundException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException();
        }
    }
}
