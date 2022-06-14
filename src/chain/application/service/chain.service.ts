import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IdGeneratorService } from '@core/service/id-generator.service';
import { Chain } from '../../domain/entity/chain.entity';
import { CreateChainDto } from '../dto/create-chain.dto';
import { UpdateChainDto } from '../dto/update-chain.dto';
import { PasswordHashGenerator } from '@auth/application/service/password-hash-generator.service';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ChainRepository } from '@root/chain/domain/repository/chain.repository';

@Injectable()
export class ChainService {
    constructor(
        private readonly idGeneratorService: IdGeneratorService,
        private readonly passwordHashGenerator: PasswordHashGenerator,
        @InjectRepository(Chain) private readonly chainRepo: ChainRepository,
    ) {}

    async create(dto: CreateChainDto): Promise<Chain> {
        const { title, active } = { ...dto };
        const chain = new Chain(this.idGeneratorService.generateMongoId(), title, active);
        await this.chainRepo.save(chain);

        return chain;
    }

    async update(id: string, dto: UpdateChainDto): Promise<Chain> {
        const chain = await this.chainRepo.findById(id);

        if (!chain) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        chain.active = dto.active;
        await this.chainRepo.save(chain);

        return chain;
    }

    async findById(id: string): Promise<Chain | null> {
        return await this.chainRepo.findById(id);
    }
}
