class Board {
  constructor() {
    this.squares = {};
    this.possibleMoves = {};

    const files = ['a','b','c','d','e','f','g','h'];
    const pieces = ['Rook','Knight','Bishop','Queen','King', 'Bishop', 'Knight', 'Rook'];
    let piece = '';
    let player = '';
    let color = '';

    for (let fileIndex = 0; files[fileIndex]; fileIndex++) {

      color = 'black'
      if (fileIndex % 2) {
        color = 'white';
      }

      for (let rankIndex = 1; rankIndex <= 8; rankIndex++) {

        if (rankIndex - 1) {
          if (color === 'white') {
            color = 'black';
          } else {
            color = 'white'
          }
        }

        piece = '';

        if (rankIndex === 2) {
          piece = 'Pawn';
          player = 'white';
          this.squares[`${files[fileIndex]}${rankIndex}`] = (new Square(files[fileIndex], rankIndex, piece, player, color));
        } else if (rankIndex === 7) {
          piece = 'Pawn';
          player = 'black';
          this.squares[`${files[fileIndex]}${rankIndex}`] = (new Square(files[fileIndex], rankIndex, piece, player, color));
        }

          else if (rankIndex === 1) {
          piece = pieces[fileIndex];
          player = 'white';
          this.squares[`${files[fileIndex]}${rankIndex}`] = (new Square(files[fileIndex], rankIndex, piece, player, color));
        } else if (rankIndex === 8) {
          piece = pieces[8 - fileIndex];
          player = 'black';
          this.squares[`${files[fileIndex]}${rankIndex}`] = (new Square(files[fileIndex], rankIndex, piece, player, color));
        } else {
          player = '';
          this.squares[`${files[fileIndex]}${rankIndex}`] = (new Square(files[fileIndex], rankIndex, piece, player, color));
        }
      }
    }

    return this.squares;
  }
}
