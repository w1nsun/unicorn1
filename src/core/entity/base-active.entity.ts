import { Column } from 'typeorm';
import { Chain } from '../../chain/entity/chain.entity';
import { BaseChain } from './base-chain.entity';

export abstract class BaseActive extends BaseChain {
    @Column({ default: true })
    public active: boolean;

    protected constructor(id: string, chain: Chain) {
        super(id, chain);
        this.active = true;
    }
}
