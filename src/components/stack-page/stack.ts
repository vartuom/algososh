interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    getStack: () => T[];
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item)
    };

    pop = (): void => {
        this.container.pop()
    };

    clear = () => {
        this.container = [];
    }

    getStack = () => {
        return this.container;
    }
}