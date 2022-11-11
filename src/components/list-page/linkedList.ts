export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    append: (element: T) => void;
    print: () => void;
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


    print() {
        let curr = this.head;
        let res: T[] = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res
    }
}