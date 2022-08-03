import { BaseRepository } from '@core/domain/repository/base.repository';
import { ServiceCategory } from '@root/chain/domain/entity/service-category.entity';
import { ServiceCategoryRepository } from '@root/chain/domain/repository/service-category.repository';

export class ServiceCategoryMikroRepository
    extends BaseRepository<ServiceCategory>
    implements ServiceCategoryRepository
{
    async findById(id: string): Promise<ServiceCategory | null> {
        return await this.findOne({ id }, { populate: ['chain', 'agencies'] });
    }
}
