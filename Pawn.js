class Pawn extends Square {
  constructor(file, rank, piece, player, color, hasMoved) {
    super(file, rank, player, color, hasMoved);
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

    if (isInCheck !== this.player) {
      if (!oneSquareForward.piece) {
        allPossibleMoves[this.id].push(oneSquareForward);
        if (!twoSquaresForward.piece && !this.hasMoved) {
          allPossibleMoves[this.id].push(twoSquaresForward);
        }
      }

      if (leftDiagonalSquare.player && leftDiagonalSquare.player !== this.player) {
        allPossibleMoves[this.id].push(leftDiagonalSquare);
      }
      if (rightDiagonalSquare.player && rightDiagonalSquare.player !== this.player) {
        allPossibleMoves[this.id].push(rightDiagonalSquare);
      }
    } else {

      let king = null;
      let blockingMoves = [];

      for (let move in allPossibleMoves[threateningPiece]) {
        if (allPossibleMoves[threateningPiece][move] instanceof King) {
          king = allPossibleMoves[threateningPiece][move].id;
          break;
        }
      }

      // console.log('King: ',king);
      // console.log('threateningPiece: ',threateningPiece);

      if (board[threateningPiece] instanceof Bishop) {
        let rankLimit = null;
        let rankIndex = null;
        let fileOffset = 0;
        parseInt(threateningPiece[1]) > parseInt(king[1]) ? rankLimit = parseInt(threateningPiece[1]) : rankLimit = parseInt(king[1]);
        parseInt(threateningPiece[1]) < parseInt(king[1]) ? rankIndex = parseInt(threateningPiece[1]) : rankIndex = parseInt(king[1]);
        for (rankIndex; rankIndex < rankLimit; rankIndex++) {
          let fileLimit = null;
          let fileIndex = null;
          files.findIndex((element) => element === threateningPiece[0]) > files.findIndex((element) => element ===king[0]) ? fileLimit = files.findIndex((element) => element === threateningPiece[0]) : fileLimit = files.findIndex((element) => element ===king[0]);
          files.findIndex((element) => element === threateningPiece[0]) < files.findIndex((element) => element ===king[0]) ? fileIndex = files.findIndex((element) => element === threateningPiece[0]) : fileIndex = files.findIndex((element) => element ===king[0]);
          blockingMoves.push(`${files[fileIndex + fileOffset]}${rankIndex}`);
          ++fileOffset;
        }

      }
      // else if (board[threateningPiece] instanceof Rook) {

      // } else if (board[threateningPiece] instanceof Queen) {

      // }
      // console.log(blockingMoves);

      if (leftDiagonalSquare.id === threateningPiece) {
        allPossibleMoves[this.id].push(leftDiagonalSquare);
      }
      if (rightDiagonalSquare.id === threateningPiece) {
        allPossibleMoves[this.id].push(rightDiagonalSquare);
      }

      // console.log(oneSquareForward.id);
      // console.log(blockingMoves.findIndex((element) => element === oneSquareForward.id));
      if (!oneSquareForward.piece) {
        if (blockingMoves.findIndex((element) => element === oneSquareForward.id) > 0) {
          allPossibleMoves[this.id].push(oneSquareForward);
          if (!twoSquaresForward.piece && !this.hasMoved) {
            if (blockingMoves.findIndex((element) => element === twoSquaresForward.id) > 0) {
              console.log(blockingMoves.findIndex((element) => element === twoSquaresForward.id));
              allPossibleMoves[this.id].push(twoSquaresForward);
            }
          }
        }

      }

      // console.log(allPossibleMoves[this.id]);

    }
  }
}
