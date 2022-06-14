import { EntityRepository } from '@mikro-orm/mongodb';
import { Chain } from '@root/chain/domain/entity/chain.entity';
import { Agency } from '@root/chain/domain/entity/agency.entity';
import { AgencyRepository } from '@root/chain/domain/repository/agency.repository';

export class AgencyMikroRepository extends EntityRepository<Agency> implements AgencyRepository {
    async findById(id: string): Promise<Agency | null> {
        return await this.findOne({ id });
    }

    async save(entity: Chain): Promise<void> {
        await this.em.persistAndFlush(entity);
    }
}
