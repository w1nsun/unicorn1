import { EntityRepository } from '@mikro-orm/mongodb';
import { Auth } from '@auth/domain/entity/auth.entity';
import { AuthRepository } from '@auth/domain/repository/auth.repository';

export class AuthMikroRepository extends EntityRepository<Auth> implements AuthRepository {
    findById(id: string): Promise<Auth | null> {
        return this.findOne({ id });
    }

    async save(entity: Auth): Promise<void> {
        await this.em.persistAndFlush(entity);
    }
}
