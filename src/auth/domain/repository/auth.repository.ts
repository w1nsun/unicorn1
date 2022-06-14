import { Auth } from '@auth/domain/entity/auth.entity';
import { BaseRepository } from '@core/domain/repository/base.repository';

export interface AuthRepository extends BaseRepository<Auth> {}
