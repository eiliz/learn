const Group = require('../Group.js');

describe('Group class tests', () => {
  test('Group instantiation works', () => {
    expect(new Group()).toBeInstanceOf(Group);
  });

  test('Group method has works', () => {
    expect(new Group()).toHaveProperty('has');
  });

  test('Group method from works', () => {
    const group = Group.from([10, 20]);
    expect(group).toBeInstanceOf(Group);
    expect(group.has(10)).toBe(true);
  });

  test('Group method add works', () => {
    const group = Group.from([10, 20]);
    group.add(7);
    expect(group.has(7)).toBe(true);
  });

  test('Group method delete works', () => {
    const group = Group.from([10, 20]);
    group.add(7);
    group.delete(7);
    expect(group.has(7)).toBe(false);
  });

  test('Group is iterable', () => {
    const temp = [];
    for (let value of Group.from(['a', 'b', 'c'])) {
      temp.push(value);
    }

    expect(temp).toEqual(['a', 'b', 'c']);
  });
});
