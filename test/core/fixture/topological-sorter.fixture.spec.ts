import { ChainFixture } from 'src/chain/fixture/chain.fixture';
import { IFixtureDependent } from 'src/fixture/idependent.fixture';
import { FixtureTopologicalSorter } from 'src/fixture/sorter/topological-sorter.fixture';
import { Vertex } from 'src/fixture/sorter/vertex.fixture';

describe('Fixture Topological Sorter', () => {
    let sorter: FixtureTopologicalSorter;
    let chainFixture: jest.Mocked<IFixtureDependent>;

    beforeEach(() => {
        sorter = new FixtureTopologicalSorter();

        const chainFixtureMock = [ChainFixture];
        chainFixture = {
            getDependencies: jest.fn().mockImplementation(() => chainFixtureMock),
        };
    });

    describe('sort', () => {
        it('should return an array of fixures', async () => {
            const vert = new Vertex(chainFixture);
            sorter.addNode(vert);
            const res = sorter.sort();
            console.log(res);
        });
    });
});
