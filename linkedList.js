class LinkedList {
    constructor() {
        this.head = null;
    }

    append(key, value = null) {
        const node = new Node(key, value);
        if (this.head === null) {
            this.head = node;
        } else {
            let currentNode = this.head;
            while (currentNode.nextNode !== null) {
                currentNode = currentNode.nextNode;
            }
            currentNode.nextNode = node;
        }
    }

    prepend(key, value = null) {
        const node = new Node(key, value);
        node.nextNode = this.head;
        this.head = node;
    }

    size() {
        let count = 0;
        let currentNode = this.head;
        while (currentNode !== null) {
            count++;
            currentNode = currentNode.nextNode;
        }
        return count;
    }

    at(index) {
        let currentNode = this.head;
        let i = 0;
        while (currentNode !== null && i < index) {
            currentNode = currentNode.nextNode;
            i++;
        }
        return currentNode;
    }

    find(key) {
        let currentNode = this.head;
        let index = 0;
        while (currentNode !== null) {
            if (currentNode.key === key) {
                return index;
            }
            currentNode = currentNode.nextNode;
            index++;
        }
        return null;
    }

    removeAt(index) {
        if (index >= this.size()) {
            return `Invalid index. Please use 0-${this.size() - 1}.`;
        } else if (index === 0) {
            let currentNode = this.head;
            this.head = this.head.nextNode;
            return `Removed "${currentNode.key}" at index ${index}.`;
        } else {
            let currentNode = this.head;
            let previousNode;
            for (let i = 0; i < index; i++) {
                previousNode = currentNode;
                currentNode = currentNode.nextNode;
            }
            const removedNode = currentNode.key;
            previousNode.nextNode = currentNode.nextNode;
            return `Removed "${removedNode}" at index ${index}.`;
        }
    }

    getKeys() {
        const keys = [];
        let currentNode = this.head;
        while (currentNode !== null) {
            keys.push(currentNode.key);
            currentNode = currentNode.nextNode;
        }
        return keys;
    }

    getValues() {
        const values = [];
        let currentNode = this.head;
        while (currentNode !== null) {
            values.push(currentNode.value);
            currentNode = currentNode.nextNode;
        }
        return values;
    }

    getInfo() {
        const info = [];
        let currentNode = this.head;
        while (currentNode !== null) {
            info.push(`${currentNode.key}, ${currentNode.value}`);
            currentNode = currentNode.nextNode;
        }
        return info;
    }
}

class Node {
    constructor(key = null, value = null) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}

export { LinkedList };