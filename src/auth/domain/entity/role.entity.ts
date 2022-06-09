import { BaseEntity } from '@core/domain/entity/base.entity';
import { Entity, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ tableName: 'auth_role' })
export class Role extends BaseEntity {
    @Property({ nullable: false })
    title: string;

    @Property({ nullable: false })
    slug: string;

    @Property({ nullable: false })
    chainId: ObjectId;

    constructor(id: ObjectId, title: string, slug: string, chainId: ObjectId) {
        super(id);
        this.title = title;
        this.slug = slug;
        this.chainId = chainId;
    }
}
