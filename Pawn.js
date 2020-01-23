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
    var oneSquareForward = '';
    var twoSquaresForward = '';
    var leftDiagonalSquare = '';
    var rightDiagonalSquare = '';
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

      if (leftDiagonalSquare) {
        allPossibleMoves[this.id].push(leftDiagonalSquare);
      }
      if (rightDiagonalSquare) {
        allPossibleMoves[this.id].push(rightDiagonalSquare);
      }
    } else {

      let blockingMoves = [];

      let king = null;

      let rankLimit = null;
      let rankIndex = null;

      let fileLimit = null;
      let fileIndex = null;

      let fileOffset = null;

// KING DEFINITON

      for (let piece in board) {
        if (board[piece] instanceof King && board[piece].player === this.player) {
          king = piece;
          break;
        }
      }

      threateningPieces.forEach(threateningPiece => {
        // RANKLIMIT/RANKINDEX DEFINITON

        parseInt(threateningPiece[1]) > parseInt(king[1]) ?
          rankLimit = parseInt(threateningPiece[1]) :
          rankLimit = parseInt(king[1]);

        parseInt(threateningPiece[1]) < parseInt(king[1]) ?
          rankIndex = parseInt(threateningPiece[1]) :
          rankIndex = parseInt(king[1]);

        // FILELIMIT/FILEINDEX DEFINITION

        files.findIndex((element) => element === threateningPiece[0]) > files.findIndex((element) => element === king[0]) ?
          fileLimit = files.findIndex((element) => element === threateningPiece[0]) :
          fileLimit = files.findIndex((element) => element === king[0]);

        files.findIndex((element) => element === threateningPiece[0]) < files.findIndex((element) => element === king[0]) ?
          fileIndex = files.findIndex((element) => element === threateningPiece[0]) :
          fileIndex = files.findIndex((element) => element === king[0]);

        // BLOCKINGMOVES DEFINITION

        switch (board[threateningPiece].constructor.name) {
          case 'Rook': {

            if (rankIndex === rankLimit) {
              for (fileIndex; fileIndex < fileLimit; fileIndex++) {
                blockingMoves.push(`${files[fileIndex]}${rankIndex}`);
              }
            } else {
              for (rankIndex; rankIndex < rankLimit; rankIndex++) {
                blockingMoves.push(`${files[fileIndex]}${rankIndex}`);
              }
            }

          } break;
          case 'Bishop': {
            for (rankIndex; rankIndex < rankLimit; rankIndex++) {
              blockingMoves.push(`${files[fileIndex]}${rankIndex}`);
              ++fileIndex;
            }

          } break;
          case 'Queen': {

            if (rankIndex === rankLimit) {
              for (fileIndex; fileIndex < fileLimit; fileIndex++) {
                blockingMoves.push(`${files[fileIndex]}${rankIndex}`);
              }
            } else {
              for (rankIndex; rankIndex < rankLimit; rankIndex++) {
                blockingMoves.push(`${files[fileIndex]}${rankIndex}`);
              }
            }

            for (rankIndex; rankIndex < rankLimit; rankIndex++) {
              blockingMoves.push(`${files[fileIndex]}${rankIndex}`);
              ++fileIndex;
            }
          }
        }



        if (leftDiagonalSquare.id === threateningPiece) {
          allPossibleMoves[this.id].push(leftDiagonalSquare);
        }
        if (rightDiagonalSquare.id === threateningPiece) {
          allPossibleMoves[this.id].push(rightDiagonalSquare);
        }

        if (!oneSquareForward.piece && blockingMoves.findIndex((element) => element === oneSquareForward.id) > 0) {
          allPossibleMoves[this.id].push(oneSquareForward);
          if (!this.hasMoved && !twoSquaresForward.piece && blockingMoves.findIndex((element) => element === twoSquaresForward.id) > 0) {
            allPossibleMoves[this.id].push(twoSquaresForward);
          }
        }
      });
    }
  }
}
