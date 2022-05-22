import { OutOfBoundsException } from '../../core/exception/out-of-bounds.exception';

export class FixtureReferenceRepository {
    private references = [];

    addRef(name: string, value: any): void {
        this.references[name] = value;
    }
    getRef(name: string) {
        if (!this.getRef(name)) {
            throw new OutOfBoundsException(`Reference ${name} not found`);
        }

        return this.references[name];
    }
    hasRef(name: string): boolean {
        return this.references[name] !== 'undefined';
    }
}
