import { ChainFixture } from 'src/chain/fixture/chain.fixture';
import { IFixtureDependent } from 'src/core/fixture/idependent.fixture';
import { FixtureTopologicalSorter } from 'src/core/fixture/topological-sorter.fixture';
import { Vertex } from 'src/core/fixture/vertex.fixture';

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
