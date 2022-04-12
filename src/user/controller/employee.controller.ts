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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployeeService } from '../service/employee.service';
import { EmployeeDto } from '../dto/employee.dto';
import { Employee } from '../entity/employee.entity';
import { EmployeeNotFoundException } from '../exception/employee-not-found.exception';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@ApiTags('Employee')
@Controller('/employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

    @Get()
    async getEmployees(): Promise<EmployeeDto[]> {
        const employees = await this.employeeService.getAllEmployees();

        return employees.map((entity: Employee) =>
            EmployeeDto.fromEntity(entity),
        );
    }

    @Get(':id')
    async getEmployee(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<EmployeeDto> {
        try {
            const employee = await this.employeeService.getEmployeeById(id);
            return EmployeeDto.fromEntity(employee);
        } catch (error) {
            if (error instanceof EmployeeNotFoundException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException();
        }
    }

    @ApiOperation({ summary: 'Create Employee' })
    @ApiResponse({ type: EmployeeDto })
    @Post()
    async createEmployee(@Body() dto: CreateEmployeeDto): Promise<EmployeeDto> {
        const employee = await this.employeeService.create(dto);

        return EmployeeDto.fromEntity(employee);
    }

    @Put(':id')
    async updateEmployee(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateEmployeeDto,
    ): Promise<EmployeeDto> {
        try {
            const employee = await this.employeeService.update(id, dto);
            return EmployeeDto.fromEntity(employee);
        } catch (error) {
            if (error instanceof EmployeeNotFoundException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException();
        }
    }
}
