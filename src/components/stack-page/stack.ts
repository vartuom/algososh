interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    getStack: () => Array<T>;
}

export class Stack<T> implements IStack<T> {
    private container = [] as Array<T>;

    push = (item: T) => {
        this.container.push(item)
    };

    pop = () => {
        this.container.pop()
    };

    clear = () => {
        this.container = [];
    }

    getStack = () => {
        return this.container;
    }
}