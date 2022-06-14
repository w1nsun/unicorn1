import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { Agency } from '../../domain/entity/agency.entity';
import { CreateAgencyDto } from '../dto/create-agency.dto';
import { PasswordHashGenerator } from '@auth/application/service/password-hash-generator.service';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UpdateAgencyDto } from '@root/chain/application/dto/update-agency.dto';
import { AgencyRepository } from '@root/chain/domain/repository/agency.repository';
import { ChainService } from '@root/chain/application/service/chain.service';

@Injectable()
export class AgencyService {
    constructor(
        private readonly idGeneratorService: IdGeneratorService,
        private readonly passwordHashGenerator: PasswordHashGenerator,
        private readonly chainService: ChainService,
        @InjectRepository(Agency) private readonly agencyRepo: AgencyRepository,
    ) {}

    async create(dto: CreateAgencyDto): Promise<Agency> {
        const { title, active, chainId } = { ...dto };
        const chain = await this.chainService.findById(chainId);
        if (!chain) {
            throw new HttpException('Chain not found', HttpStatus.NOT_FOUND);
        }
        const agency = new Agency(this.idGeneratorService.generateMongoId(), title, chain);
        await this.agencyRepo.save(agency);

        return agency;
    }

    async update(id: string, dto: UpdateAgencyDto): Promise<Agency> {
        const agency = await this.agencyRepo.findById(id);
        if (!agency) {
            throw new HttpException('Agency not found', HttpStatus.NOT_FOUND);
        }
        agency.active = dto.active;
        await this.agencyRepo.save(agency);

        return agency;
    }
}
