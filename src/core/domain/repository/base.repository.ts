export interface BaseRepository<Entity> {
    findById(id: string): Promise<Entity | null>;
    save(entity: Entity): Promise<void>;
}
