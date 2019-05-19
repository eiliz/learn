const Matrix = require('../Matrix.js');

describe('Matrix class tests', () => {
  test('Generate matrix', () => {
    const matrix = new Matrix(2, 2);
    expect(matrix).toBeDefined();
  });

  test('Getting a value works', () => {
    const matrix = new Matrix(2, 2, (x, y) => x + y);
    expect(matrix.get(1, 1)).toBe(2);
  });

  test('Setting a value works', () => {
    const matrix = new Matrix(2, 2);
    matrix.set(1, 1, 7);
    expect(matrix.get(1, 1)).toBe(7);
  });
});
