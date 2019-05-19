class Matrix {
  constructor(
    width,
    height,
    element = (x, y) => undefined,
    iterator = undefined
  ) {
    this.width = width;
    this.height = height;
    // The elements of the matrix are stored in an array
    // The element fn is used to prepopulate the values with undefined
    // or some other custom values
    this.content = [];

    // Generating the array
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  // Defining a custom iterator by using the existing Symbol
  // Symbol.iterator which is already present on the Symbol class
  [Symbol.iterator]() {
    return new MatrixIterator(this);
  }

  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) {
      return { done: true };
    }

    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y)
    };

    this.x++;

    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }

    return { value, done: false };
  }
}

module.exports = Matrix;
