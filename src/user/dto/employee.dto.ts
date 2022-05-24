import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../entity/employee.entity';

export class EmployeeDto {
    @ApiProperty({ example: '35726a73-0022-4fc8-baa3-119df50c23d7' })
    id: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    chainId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ type: Date })
    updatedAt: Date | null;

    static fromEntity(entity: Employee): EmployeeDto {
        const dto = new this();
        dto.id = entity.id;
        dto.active = entity.active;
        dto.chainId = entity.chain.id;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;

        return dto;
    }
}
