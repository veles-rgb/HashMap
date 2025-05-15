// hashSet.js
import { LinkedList } from "./linkedList.js";

class HashSet {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(this.capacity);
        this.count = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        if (!this.buckets[index]) {
            this.buckets[index] = new LinkedList();
            this.buckets[index].prepend(key);
            this.count++;
        } else {
            const nodeIndex = this.buckets[index].find(key);
            if (nodeIndex === null) {
                this.buckets[index].prepend(key);
                this.count++;
            }
        }

        if (this.count / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    has(key) {
        let index = this.hash(key);
        if (!this.buckets[index]) return false;
        return this.buckets[index].find(key) !== null;
    }

    remove(key) {
        let index = this.hash(key);
        if (!this.has(key)) return false;
        let nodeIndex = this.buckets[index].find(key);
        if (nodeIndex !== null) {
            this.buckets[index].removeAt(nodeIndex);
            return true;
        }
        return false;
    }

    length() {
        return this.count;
    }

    clear() {
        this.buckets = new Array(16);
        this.capacity = 16;
        this.count = 0;
    }

    keys() {
        const keysArr = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                keysArr.push(...bucket.getKeys());
            }
        });
        return keysArr;
    }

    resize() {
        console.log(`Resizing from capacity ${this.capacity} to ${this.capacity * 2}...`);
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity);
        this.count = 0;

        oldBuckets.forEach(bucket => {
            if (bucket) {
                let currentNode = bucket.head;
                while (currentNode !== null) {
                    this.set(currentNode.key);
                    currentNode = currentNode.nextNode;
                }
            }
        });
        console.log(`Resize complete. New capacity: ${this.capacity}`);
    }
}

export { HashSet };