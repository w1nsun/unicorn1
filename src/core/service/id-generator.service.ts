import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { ObjectId } from '@mikro-orm/mongodb';

@Injectable()
export class IdGeneratorService {
    generateUuidV4() {
        return uuid.v4();
    }

    generateMongoId() {
        return new ObjectId(ObjectId.generate());
    }
}
