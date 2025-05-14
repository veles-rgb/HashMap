// hashMap.js
import { LinkedList } from "./linkedList.js";

class HashMap {
    constructor(loadFactor, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(this.capacity);
        this.keyCount = 0;
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

        if (!this.buckets[index]) {
            this.buckets[index] = new LinkedList();
            this.buckets[index].prepend(key, value);
            return `Added: ${key}:${value}\n`;
        } else {
            // If the key is different add it to the LinkedList
            if (this.buckets[index].find(key) === false) {
                this.buckets[index].prepend(value, key);
                return `Added: ${key}:${value} (collision handled)`;
            } else {
                // If the key is the same change the value
                this.buckets[index].find(key).value = value;
                return `Updated: ${key} with new value: ${value}`;
            }
        }
    }

    get(key) {
        let index = this.hash(key);
    }
}

export { HashMap };;