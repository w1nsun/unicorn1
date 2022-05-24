import { BaseEntity } from './base-entity.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { Chain } from '../../chain/entity/chain.entity';

export abstract class BaseChain extends BaseEntity {
    @ManyToOne(() => Chain, (chain) => chain.id)
    @JoinColumn({ name: 'chain_id' })
    public chain: Chain;

    protected constructor(id: string, chain: Chain) {
        super(id);
        this.chain = chain;
    }
}
