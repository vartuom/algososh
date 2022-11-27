export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next)
    }
}

interface ILinkedList<T> {
    append: (item: T) => void,
    toArray: () => Array<T>,
    deleteTail: () => void,
    prepend: (item: T) => void,
    deleteHead: () => void,
    addByIndex: (item: T, index: number) => void;
    deleteByIndex: (index: number) => void;
    getSize: () => void
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    constructor(initialArray: T[]) {
        this.head = null;
        this.size = 0;
        initialArray.forEach(element => this.append(element))
    }

    append(element: T) {
        const node = new Node(element);
        if (this.head) {
            let current = this.head;
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        } else {
            this.head = node;
        }
        this.size++;
    }

    deleteTail() {
        let current;
        if (!this.head?.next) {
            this.head = null;
        } else {
            current = this.head;
            while (current.next?.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.size--;
    }

    prepend(item: T) {
        const node = new Node(item, this.head);
        this.head = node;
        this.size++;
    }

    deleteHead() {
        if (this.head) {
            this.head = this.head.next;
            this.size--;
        }
    }

    addByIndex(item: T, index: number) {
        if (index < 0 || index > this.size) return;
        if (!this.head || index <= 0) this.prepend(item);
        else if (index >= (this.size - 1)) {
            this.append(item);
        } else {
            let current = this.head;
            let currentIndex = 0;
            while (currentIndex !== (index - 1) && current.next) {
                current = current.next;
                currentIndex++;
            }
            const node = new Node(item, current.next);
            current.next = node;
            this.size++;
        }
    }

    deleteByIndex(index: number) {
        if (index < 0 || index > this.size) return;
        let current = this.head;
        if (index === 0) {
            if (this.head) this.head = this.head?.next;
        } else {
            let prev = null;
            let currIndex = 0;
            while (currIndex++ < index) {
                prev = current;
                if (current) {
                    current = current.next;
                }
            }
            if (prev?.next) prev.next = current?.next ? current.next : null;
        }
        this.size--;
    }

    getSize = () => this.size;

    toArray() {
        let curr = this.head;
        let arr: T[] = [];
        while (curr) {
            arr.push(curr.value);
            curr = curr.next;
        }
        return arr
    }
}