class Board {
  constructor() {
    this.squares = [];

    const files = ['a','b','c','d','e','f','g','h'];
    const pieces = ['Rook','Knight','Bishop','Queen','King'];
    let piece = '';

    for (let fileIndex = 0; files[fileIndex]; fileIndex++) {
      for (let rankIndex = 0; rankIndex < 8; rankIndex++) {

        if (rankIndex === 2 || rankIndex === 7) {
          piece = 'Pawn';
        }
        this.squares.push(new Square(files[fileIndex], rankIndex, piece));
      }
    }
  }
}
