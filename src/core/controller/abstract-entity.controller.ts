import {
    BadRequestException,
    Get,
    InternalServerErrorException,
    Param,
    ParseUUIDPipe,
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
        const employees = await this.service.getAll();

        return employees.map((entity: TEntity) =>
            this.dtoFactoryMethod(entity),
        );
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

    //
    // @ApiOperation({ summary: 'Create Employee' })
    // @ApiResponse({ type: EmployeeDto })
    // @Post()
    // async create(@Body() dto: CreateChainDto): Promise<EmployeeDto> {
    //     const employee = await this.employeeService.createEmployee(dto);
    //
    //     return EmployeeDto.fromEntity(employee);
    // }
    //
    // @Put(':id')
    // async update(
    //     @Param('id', ParseUUIDPipe) id: string,
    //     @Body() dto: UpdateChainDto,
    // ): Promise<EmployeeDto> {
    //     try {
    //         const employee = await this.employeeService.updateEmployee(id, dto);
    //         return EmployeeDto.fromEntity(employee);
    //     } catch (error) {
    //         if (error instanceof EmployeeNotFoundException) {
    //             throw new BadRequestException(error.message);
    //         }
    //
    //         throw new InternalServerErrorException();
    //     }
    // }
}
