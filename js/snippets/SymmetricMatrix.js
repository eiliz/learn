const Matrix = require('./Matrix.js');

class SymmetricMatrix extends Matrix {
  constructor(width, element = (x, y) => undefined) {
    super(width, width, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }

  set(x, y, value) {
    super.set(x, y, value);

    if (x != y) {
      super.set(y, x, value);
    }
  }
}

module.exports = SymmetricMatrix;
