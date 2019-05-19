const Vector = require('../Vector.js');

describe('Testing the Vector class', () => {
  test('Creating a vector instance', () => {
    expect(new Vector(3, 4)).toBeInstanceOf(Vector);
  });

  test('Getting the length', () => {
    expect(new Vector(3, 4).length).toBe(5);
  });

  test('Vector addition returns a vector', () => {
    expect(new Vector(1, 2).plus(new Vector(2, 3))).toBeInstanceOf(Vector);
  });

  test('Vector addition returns the right vector', () => {
    expect(new Vector(1, 2).plus(new Vector(2, 3))).toMatchObject({
      x: 3,
      y: 5
    });
  });

  test('Vector subtraction returns the right vector', () => {
    expect(new Vector(1, 2).minus(new Vector(2, 3))).toMatchObject({
      x: -1,
      y: -1
    });
  });
});
