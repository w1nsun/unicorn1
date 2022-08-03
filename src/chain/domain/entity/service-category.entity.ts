import { Chain } from './chain.entity';
import { BaseEntity } from '@core/domain/entity/base.entity';
import { Collection, Entity, EntityRepositoryType, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Agency } from '@root/chain/domain/entity/agency.entity';
import { ServiceCategoryMikroRepository } from '@root/chain/infrastructure/repository/service-category.mikro.repository';

@Entity({ tableName: 'chain_service_categories', customRepository: () => ServiceCategoryMikroRepository })
export class ServiceCategory extends BaseEntity {
    @Property({ nullable: false })
    title: string;

    @Property({ default: true })
    active: boolean;

    @Property({ nullable: false, default: 0 })
    index: number;

    @Property({ nullable: true, default: null })
    left: number | null;

    @Property({ nullable: true, default: null })
    right: number | null;

    @ManyToOne({ entity: () => Chain })
    chain: Chain;

    @ManyToMany(() => Agency)
    agencies: Collection<Agency> = new Collection<Agency>(this);

    [EntityRepositoryType]?: ServiceCategoryMikroRepository;

    constructor(id: ObjectId, title: string, active: boolean, chain: Chain) {
        super(id);
        this.title = title;
        this.active = active;
        this.chain = chain;
        this.index = 0;
        this.left = null;
        this.right = null;
    }
}
