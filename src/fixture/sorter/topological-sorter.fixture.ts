import { RuntimeException } from '../../core/exception/runtime.exception';
import { Vertex } from './vertex.fixture';

export class FixtureTopologicalSorter {
    private nodeList: Vertex[] = [];
    private sortedNodeList: any[] = [];

    public addNode(node: Vertex): void {
        this.nodeList.push(node);
    }

    public sort() {
        for (const definition of this.nodeList) {
            if (definition.state !== Vertex.NOT_VISITED) {
                continue;
            }

            this.visit(definition);
        }

        const sortedList = this.sortedNodeList;

        this.nodeList = [];
        this.sortedNodeList = [];

        return sortedList;
    }

    private visit(definition: Vertex) {
        definition.state = Vertex.IN_PROGRESS;

        for (const dependency of definition.dependencyList) {
            if (!this.nodeList[dependency]) {
                throw new RuntimeException();
            }

            const childDefinition = this.nodeList[dependency];

            // allow self referencing classes
            if (definition === childDefinition) {
                continue;
            }

            switch (childDefinition.state) {
                case Vertex.VISITED:
                    break;
                case Vertex.IN_PROGRESS:
                    break;
                case Vertex.NOT_VISITED:
                    this.visit(childDefinition);
            }
        }

        definition.state = Vertex.VISITED;

        this.sortedNodeList.push(definition);
    }
}
