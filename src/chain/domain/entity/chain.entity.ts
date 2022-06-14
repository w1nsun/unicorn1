import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { ChainMikroRepository } from '@root/chain/infrastructure/repository/chain.mikro.repository';
import { ObjectId } from '@mikro-orm/mongodb';
import { BaseEntity } from '@core/domain/entity/base.entity';

@Entity({ tableName: 'chain_chain', customRepository: () => ChainMikroRepository })
export class Chain extends BaseEntity {
    @Property({ nullable: false })
    public title: string;

    @Property({ default: true })
    public active: boolean;

    // @OneToMany(() => Agency, (agency) => agency.chain)
    // public agencies: Agency[];

    [EntityRepositoryType]?: ChainMikroRepository;

    constructor(id: ObjectId, title: string, active: boolean) {
        super(id);
        this.title = title;
        this.active = active;
    }
}
