import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@root/core/entity/base-entity.entity';

@Entity('auth_role')
export class Role extends BaseEntity {
    @Column({ nullable: false, length: 128, type: 'varchar' })
    public title: string;

    @Column({ nullable: false, length: 64, type: 'varchar' })
    public slug: string;

    @Column({ type: 'uuid' })
    public chainId: string;

    constructor(id: string, title: string, slug: string, chainId: string) {
        super(id);
        this.title = title;
        this.slug = slug;
        this.chainId = chainId;
    }
}
