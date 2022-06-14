import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { BaseEntity } from '@core/domain/entity/base.entity';
import { ObjectId } from '@mikro-orm/mongodb';
import { AgencyMikroRepository } from '@root/chain/infrastructure/repository/agency.mikro.repository';
import { Chain } from '@root/chain/domain/entity/chain.entity';

@Entity({ tableName: 'chain_agency', customRepository: () => AgencyMikroRepository })
export class Agency extends BaseEntity {
    @Property({ nullable: false })
    public title: string;

    @Property({ default: true })
    public active: boolean;

    // @ManyToOne(() => Chain, (chain) => chain.id)
    // @JoinColumn({ name: 'chain_id' })
    public chain: Chain;

    [EntityRepositoryType]?: AgencyMikroRepository;

    constructor(id: ObjectId, title: string, chain: Chain) {
        super(id);
        this.title = title;
        this.active = true;
        this.chain = chain;
    }
}
