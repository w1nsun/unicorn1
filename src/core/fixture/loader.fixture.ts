import { Injectable } from '@nestjs/common';
import { IFixture } from './ifixture.fixture';
@Injectable()
export class FixtureLoader {
    constructor(private fixtures: IFixture[]) {}
}
