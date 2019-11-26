class Pawn extends Square {
  constructor(file, rank, piece, player, color) {
    super(file, rank, player, color);
    this.hasMoved = false;
    this.move = this.move.bind(this);
    this.updatePossibleMoves = this.updatePossibleMoves.bind(this);
    this.piece = $('<div>', {
      class: `${player} Pawn`
    })

    this.div = this.div.append(this.piece);

    return this;
  }

  updatePossibleMoves() {
    $(this.piece).click(this.move);
    var oneSquareForward = { square: null };
    var twoSquaresForward = { square: null };
    var leftDiagonalSquare = { square: null };
    var rightDiagonalSquare = { square: null };
    allPossibleMoves[this.id] = [];

    switch(this.player) {
      case 'white': {
        oneSquareForward = board[`${this.file}${this.rank + 1}`];
        twoSquaresForward = board[`${this.file}${this.rank + 2}`];
        leftDiagonalSquare = board[`${files[files.findIndex((element)=>element===this.file) - 1]}${this.rank + 1}`];
        rightDiagonalSquare = board[`${files[files.findIndex((element)=>element===this.file) + 1]}${this.rank + 1}`];
      } break;
      case 'black': {
        oneSquareForward = board[`${this.file}${this.rank - 1}`];
        twoSquaresForward = board[`${this.file}${this.rank - 2}`];
        leftDiagonalSquare = board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank - 1}`];
        rightDiagonalSquare = board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank - 1}`];
      } break;
    }

    if (!oneSquareForward)
      oneSquareForward = '';
    if (!twoSquaresForward)
      twoSquaresForward = '';
    if (!leftDiagonalSquare)
      leftDiagonalSquare = '';
    if (!rightDiagonalSquare)
      rightDiagonalSquare = '';

    if (!oneSquareForward.piece) {
      allPossibleMoves[this.id].push(oneSquareForward);
      if (!twoSquaresForward.piece) {
        allPossibleMoves[this.id].push(twoSquaresForward);
      }
    }

    if (leftDiagonalSquare.player && leftDiagonalSquare.player !== this.player) {
      allPossibleMoves[this.id].push(leftDiagonalSquare);
    }
    if (rightDiagonalSquare.player && rightDiagonalSquare.player !== this.player) {
      allPossibleMoves[this.id].push(rightDiagonalSquare);
    }
  }
}
