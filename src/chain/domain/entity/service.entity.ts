import { Chain } from './chain.entity';
import { Collection, Entity, EntityRepositoryType, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '@core/domain/entity/base.entity';
import { ServiceMikroRepository } from '@root/chain/infrastructure/repository/service.mikro.repository';
import { ObjectId } from '@mikro-orm/mongodb';
import { Agency } from '@root/chain/domain/entity/agency.entity';

@Entity({ tableName: 'chain_services', customRepository: () => ServiceMikroRepository })
export class Service extends BaseEntity {
    @Property({ nullable: false })
    title: string;

    @Property({ default: true })
    active: boolean;

    @ManyToOne({ entity: () => Chain })
    chain: Chain;

    @ManyToMany(() => Agency)
    agencies: Collection<Agency> = new Collection<Agency>(this);

    [EntityRepositoryType]?: ServiceMikroRepository;

    constructor(id: ObjectId, title: string, active: boolean, chain: Chain) {
        super(id);
        this.title = title;
        this.active = active;
        this.chain = chain;
    }
}
