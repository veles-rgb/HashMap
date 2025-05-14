// hashMap.js
import { LinkedList } from "./linkedList.js";

class HashMap {
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

    set(key, value) {
        let index = this.hash(key);

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        if (!this.buckets[index]) {
            // If the key does not exist (create new linked list with new node)
            this.buckets[index] = new LinkedList();
            this.buckets[index].prepend(key, value);
            this.count++;
        } else {
            let nodeIndex = this.buckets[index].find(key);
            let node = this.buckets[index].at(nodeIndex);
            if (node === null || node.key !== key) {
                // If the index exists but the key does not (add to linked list)
                this.buckets[index].prepend(key, value);
                this.count++;
            } else {
                // If the index and key exists (update value)
                node.value = value;
            }
        }
        if (this.count / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        let index = this.hash(key);
        if (this.buckets[index]) {
            let nodeIndex = this.buckets[index].find(key);
            let node = this.buckets[index].at(nodeIndex);
            if (node) return node.value;
        } else {
            return null;
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
        let size = 0;
        this.buckets.forEach(bucket => {
            size += bucket.size();
        });
        return size;
    }

    clear() {
        this.buckets.length = 0;
        this.capacity = 16;
        return this.buckets;
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

    values() {
        const valuesArr = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                valuesArr.push(...bucket.getValues());
            }
        });
        return valuesArr;
    }

    entries() {
        const entriesArr = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                entriesArr.push(...bucket.getInfo());
            }
        });
        return entriesArr;
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
                    this.set(currentNode.key, currentNode.value);
                    currentNode = currentNode.nextNode;
                }
            }
        });
        console.log(`Resize complete. New capacity: ${this.capacity}`);
    }
}

export { HashMap };