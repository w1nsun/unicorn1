import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Chain } from '../../chain/domain/entity/chain.entity';

@Entity('employees')
@Index('phone_email_chain_uniq', ['phone', 'email', 'chain.id'], { unique: true })
export class Employee {
    @PrimaryColumn({ type: 'uuid' })
    public readonly id: string;

    @Column()
    public password: string;

    @Column({ nullable: false, length: 32, type: 'varchar' })
    public phone: string;

    @Column({ nullable: false, length: 128, type: 'varchar' })
    public email: string;

    @Column({ default: true })
    public active: boolean;

    @ManyToOne(() => Chain, (chain) => chain.id)
    chain: Chain;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date | null;

    constructor(id: string, password: string, phone: string, email: string, active: boolean, chain: Chain) {
        this.id = id;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.active = active;
        this.chain = chain;
    }
}
