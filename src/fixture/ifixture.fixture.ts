export interface IFixture {
    load(): Promise<void>;
    cleanDB(): Promise<void>;
}
