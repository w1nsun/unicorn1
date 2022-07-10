import { Collection, Entity, EntityRepositoryType, OneToMany, Property } from '@mikro-orm/core';
import { ChainMikroRepository } from '@root/chain/infrastructure/repository/chain.mikro.repository';
import { ObjectId } from '@mikro-orm/mongodb';
import { BaseEntity } from '@core/domain/entity/base.entity';
import { Agency } from '@root/chain/domain/entity/agency.entity';

@Entity({ tableName: 'chain_chain', customRepository: () => ChainMikroRepository })
export class Chain extends BaseEntity {
    @Property({ nullable: false })
    private title: string;

    @Property({ default: true })
    private active: boolean;

    @OneToMany({ entity: () => Agency, mappedBy: 'chain', orphanRemoval: true })
    private agencies = new Collection<Agency>(this);

    [EntityRepositoryType]?: ChainMikroRepository;

    constructor(id: ObjectId, title: string, active: boolean) {
        super(id);
        this.title = title;
        this.active = active;
    }

    getTitle(): string {
        return this.title;
    }

    isActive(): boolean {
        return this.active;
    }

    getAgencies(): Agency[] {
        return this.agencies.getItems();
    }

    setAgencies(agencies): void {
        this.agencies = agencies;
    }
}
