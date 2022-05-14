import { IFixtureDependent } from './idependent.fixture';

export class Vertex {
    public static readonly NOT_VISITED = 0;
    public static readonly IN_PROGRESS = 1;
    public static readonly VISITED = 2;

    public state: number;
    public value: IFixtureDependent;
    public dependencyList: string[] = [];

    constructor(value: IFixtureDependent) {
        this.value = value;
        this.dependencyList = value.getDependencies();
    }
}
