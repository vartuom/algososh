interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    clear: () => void;
    getHead: () => number;
    getTail: () => number;
    isEmpty: () => boolean;
    getQueue: () => Array<T | undefined>;
    getSize: () => number;
    getLength: () => number;
}

export class Queue<T> implements IQueue<T> {
    private container: Array<T | undefined> = [];
    private head = 0;
    private tail = 0;
    private size = 0;
    private length = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        this.container[this.tail % this.size] = item
        this.tail++;
        this.length++;
    };

    dequeue = () => {
        this.container[this.head % this.size] = undefined;
        this.head++;
        this.length--;
    };

    clear = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = Array(this.size);
    };

    getSize = () => this.size;
    getLength = () => this.length;
    getTail = () => this.tail;
    getQueue = () => [...this.container];
    isEmpty = () => this.length === 0;
    getHead = () => this.head;
}
