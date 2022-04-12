import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Chain } from '../../chain/entity/chain.entity';

@Entity('employees')
export class Employee {
    @PrimaryColumn({ type: 'uuid' })
    public readonly id: string;

    @Column()
    public login: string;

    @Column()
    public password: string;

    @Column({ default: true })
    public active: boolean;

    @ManyToOne(() => Chain, (chain) => chain.id)
    chain: Chain;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date | null;

    constructor(
        id: string,
        login: string,
        password: string,
        active: boolean,
        chain: Chain,
    ) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.active = active;
        this.chain = chain;
    }
}
