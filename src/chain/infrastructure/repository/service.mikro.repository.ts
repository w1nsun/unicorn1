import { BaseRepository } from '@core/domain/repository/base.repository';
import { ServiceRepository } from '@root/chain/domain/repository/service.repository';
import { Service } from '@root/chain/domain/entity/service.entity';

export class ServiceMikroRepository extends BaseRepository<Service> implements ServiceRepository {
    async findById(id: string): Promise<Service | null> {
        return await this.findOne({ id }, { populate: ['chain', 'agencies'] });
    }
}
