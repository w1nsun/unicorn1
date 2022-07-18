import { EntityRepository } from '@mikro-orm/mongodb';

export abstract class BaseRepository<Entity> extends EntityRepository<Entity> {
    abstract findById(id: string): Promise<Entity | null>;

    async save(entity: Entity): Promise<void> {
        await this.em.persistAndFlush(entity);
    }
}
