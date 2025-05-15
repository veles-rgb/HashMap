# HashMap & HashSet

This project demonstrates custom implementations of **HashMap** and **HashSet** in JavaScript, created as part of [The Odin Project](https://www.theodinproject.com/lessons/javascript-hashmap).

## Features

### HashMap

- Stores key-value pairs
- Handles collisions using a linked list
- Supports:
  - `set(key, value)`
  - `get(key)`
  - `has(key)`
  - `remove(key)`
  - `length()`
  - `clear()`
  - `keys()`, `values()`, and `entries()`
  - Automatic resizing based on load factor

### HashSet

- Stores unique keys only (no values)
- Internally structured similarly to HashMap
- Supports:
  - `set(key)`
  - `has(key)`
  - `remove(key)`
  - `length()`
  - `clear()`
  - `keys()`
  - Automatic resizing based on load factor

### LinkedList

- Used internally to manage collisions within each hash bucket
- Implements a basic singly linked list with:
  - `append()`, `prepend()`
  - `find()`, `removeAt()`
  - `getKeys()`, `getValues()`, and `getInfo()`

### Hashing Method

Both `HashMap` and `HashSet` use a simple string hashing algorithm. Each character's Unicode value is multiplied by a prime number (31) and accumulated modulo the current capacity.

```js
let hashCode = 0;
const prime = 31;
for (let i = 0; i < key.length; i++) {
  hashCode = (prime * hashCode + key.charCodeAt(i)) % capacity;
}
```
