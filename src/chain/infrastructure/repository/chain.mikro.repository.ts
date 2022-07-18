import { Chain } from '@root/chain/domain/entity/chain.entity';
import { ChainRepository } from '@root/chain/domain/repository/chain.repository';
import { BaseRepository } from '@core/domain/repository/base.repository';

export class ChainMikroRepository extends BaseRepository<Chain> implements ChainRepository {
    async findById(id: string): Promise<Chain | null> {
        return await this.findOne({ id }, { populate: ['agencies'] });
    }
}
