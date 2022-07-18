import { Agency } from '@root/chain/domain/entity/agency.entity';
import { AgencyRepository } from '@root/chain/domain/repository/agency.repository';
import { BaseRepository } from '@core/domain/repository/base.repository';

export class AgencyMikroRepository extends BaseRepository<Agency> implements AgencyRepository {
    async findById(id: string): Promise<Agency | null> {
        return await this.findOne({ id });
    }
}
