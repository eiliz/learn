const SymmetricMatrix = require('../SymmetricMatrix.js');

describe('Symmetric matrix class tests', () => {
  test('Generate symmetric matrix', () => {
    const matrix = new SymmetricMatrix(2);
    expect(matrix).toBeDefined();
  });

  test('Getting a value works', () => {
    const matrix = new SymmetricMatrix(3, (x, y) => x + y);
    expect(matrix.get(1, 2)).toBe(3);
  });

  test('Setting a value works', () => {
    const matrix = new SymmetricMatrix(3);
    matrix.set(1, 2, 3);
    expect(matrix.get(1, 2)).toBe(3);
  });
});
