import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
export class UuidService {
    generateV4() {
        return uuid.v4();
    }
}
