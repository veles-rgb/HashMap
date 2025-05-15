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
        if (this.head === null) {
            this.head = node;
        } else {
            node.nextNode = this.head;
            this.head = node;
        }
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

    getHead() {
        return this.head === null ? "Empty list!" : this.head;
    }

    getTail() {
        if (this.head === null) return "Empty list";
        let currentNode = this.head;
        while (currentNode.nextNode !== null) {
            currentNode = currentNode.nextNode;
        }
        return currentNode;
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

    pop() {
        if (this.size() <= 1) {
            this.head = null;
            return;
        }
        let currentNode = this.head;
        let index = 1;
        const beforeLast = this.size() - 1;
        while (index !== beforeLast) {
            currentNode = currentNode.nextNode;
            index++;
        }
        console.log(`Removed "${currentNode.nextNode.key}"`);
        currentNode.nextNode = null;
    }

    contains(key) {
        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.key === key) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }
        return false;
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

    toString() {
        let listString = "";
        let currentNode = this.head;
        if (this.head === null) return "Empty list!";
        while (currentNode !== null) {
            listString += `(${currentNode.key}${currentNode.value !== null ? ", " + currentNode.value : ""}) -> `;
            currentNode = currentNode.nextNode;
        }
        return listString + "null";
    }

    insertAt(key, index, value = null) {
        if (index < 0 || index > this.size()) {
            return `Invalid index. Please use 0-${this.size()}.`;
        }
        const newNode = new Node(key, value);
        if (index === 0) {
            newNode.nextNode = this.head;
            this.head = newNode;
            return `Added ${key} to index 0.`;
        }
        let currentNode = this.head;
        let previousNode = null;
        let i = 0;
        while (i < index) {
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
            i++;
        }
        previousNode.nextNode = newNode;
        newNode.nextNode = currentNode;
        return `Added ${key} to index ${index}.`;
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