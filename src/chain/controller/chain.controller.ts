import { Controller } from '@nestjs/common';
import { CreateChainDto } from '../dto/create-chain.dto';
import { UpdateChainDto } from '../dto/update-chain.dto';
import { AbstractEntityController } from '../../core/controller/abstract-entity.controller';
import { ChainService } from '../service/chain.service';
import { Chain } from '../entity/chain.entity';
import { ChainDto } from '../dto/chain.dto';

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

    // @Get()
    // async getEmployees(): Promise<EmployeeDto[]> {
    //     const employees = await this.employeeService.getAllEmployees();
    //
    //     return employees.map((entity: Employee) =>
    //         EmployeeDto.fromEntity(entity),
    //     );
    // }
    //
    // @Get(':id')
    // async getEmployee(
    //     @Param('id', ParseUUIDPipe) id: string,
    // ): Promise<EmployeeDto> {
    //     try {
    //         const employee = await this.employeeService.getEmployeeById(id);
    //         return EmployeeDto.fromEntity(employee);
    //     } catch (error) {
    //         if (error instanceof EmployeeNotFoundException) {
    //             throw new BadRequestException(error.message);
    //         }
    //
    //         throw new InternalServerErrorException();
    //     }
    // }
    //
    // @ApiOperation({ summary: 'Create Employee' })
    // @ApiResponse({ type: EmployeeDto })
    // @Post()
    // async createEmployee(@Body() dto: CreateChainDto): Promise<EmployeeDto> {
    //     const employee = await this.employeeService.createEmployee(dto);
    //
    //     return EmployeeDto.fromEntity(employee);
    // }
    //
    // @Put(':id')
    // async updateEmployee(
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
