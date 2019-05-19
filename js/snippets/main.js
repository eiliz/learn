const matrix = require('./SymmetricMatrix.js');

const symMatrix = new matrix.SymmetricMatrix(3);
symMatrix.set(0, 1, 7);
symMatrix.set(0, 2, 3);
symMatrix.set(0, 3, 4);
symMatrix.set(2, 1, 5);
symMatrix.set(3, 1, 7);
symMatrix.set(3, 2, 6);
symMatrix.set(0, 0, 11);
symMatrix.set(1, 1, 2);
symMatrix.set(2, 2, 8);
symMatrix.set(3, 3, 9);

for (el of symMatrix) {
  console.log(el);
}
