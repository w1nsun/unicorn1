import { Connection, Repository } from 'typeorm';
import { UuidService } from './uuid.service';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { EntityNotFoundException } from '../exception/entity-not-found.exception';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

export abstract class AbstractEntityService<Entity, CreateDto, UpdateDto> {
    protected repo: Repository<Entity>;

    protected constructor(
        protected connection: Connection,
        protected uuidService: UuidService,
        protected entityName: EntityTarget<Entity>,
    ) {
        this.repo = this.connection.getRepository(entityName);
    }

    abstract create(dto: CreateDto): Promise<Entity>;

    abstract update(id: string, dto: UpdateDto): Promise<Entity>;

    async getAll(options?: FindManyOptions<Entity>): Promise<Entity[]> {
        return await this.repo.find(options);
    }

    async getById(id: string): Promise<Entity> {
        const entity: Entity | undefined = await this.repo.findOne({
            where: { id },
        });

        if (!entity) {
            throw new EntityNotFoundException(
                `${this.entityName} ${id} not found`,
            );
        }

        return entity;
    }
}
