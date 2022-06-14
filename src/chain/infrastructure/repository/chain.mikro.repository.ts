import { EntityRepository } from '@mikro-orm/mongodb';
import { Chain } from '@root/chain/domain/entity/chain.entity';
import { ChainRepository } from '@root/chain/domain/repository/chain.repository';

export class ChainMikroRepository extends EntityRepository<Chain> implements ChainRepository {
    async findById(id: string): Promise<Chain | null> {
        return await this.findOne({ id });
    }

    async save(entity: Chain): Promise<void> {
        await this.em.persistAndFlush(entity);
    }
}
