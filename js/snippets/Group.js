class Group {
  constructor() {
    this.members = [];
  }

  static from(collection) {
    if (collection === null) {
      console.error('Must pass a non null object');
      return false;
    }

    if (typeof collection[Symbol.iterator] !== 'function') {
      console.error('The passed pbject must be iterable');
      return false;
    }

    let group = new Group();

    for (let val of collection) {
      group.add(val);
    }

    return group;
  }

  add(value) {
    if (!this.has(value)) this.members.push(value);
  }

  delete(value) {
    this.members = this.members.filter(member => member !== value);
  }

  has(value) {
    return this.members.includes(value);
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.current = 0;
  }

  next() {
    if (this.current >= this.group.members.length) return { done: true };
    const value = this.group.members[this.current];
    this.current++;
    return { value, done: false };
  }
}

module.exports = Group;
