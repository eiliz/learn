class PGroup {
  constructor(members) {
    this.members = members;
  }

  add(value) {
    if (this.has(value)) return;
    return new PGroup(this.members.concat([value]));
  }

  has(value) {
    return this.members.includes(value);
  }

  delete(value) {
    if (!this.has(value)) return;
    return new PGroup(this.members.filter(member => member !== value));
  }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add('a');
let ab = a.add('b');
let b = ab.delete('a');

console.log(b.has('b'));
// → true
console.log(a.has('b'));
// → false
console.log(b.has('a'));
// → false
