import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryColumn({ type: 'uuid' })
    public readonly id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date | null;

    protected constructor(id: string) {
        this.id = id;
    }
}
