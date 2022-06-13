import { Auth } from '@auth/domain/entity/auth.entity';

export interface AuthRepository {
    findById(id: string): Promise<Auth | null>;
}
