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

        // BLOCKINGMOVES DEFINITION

        switch (board[threateningPiece].constructor.name) {

          case 'Rook': {
            if (leftDiagonalSquare) {
              if (leftDiagonalSquare.id === threateningPiece) {
                allPossibleMoves[this.id].push(leftDiagonalSquare);
              }
            }
            if (rightDiagonalSquare) {
              if (rightDiagonalSquare.id === threateningPiece) {
                allPossibleMoves[this.id].push(rightDiagonalSquare);
              }
            }
          } break;

          case 'Bishop': {
            if (oneSquareForward) {
              if (allPossibleMoves[threateningPiece].includes(oneSquareForward)) {
                if (oneSquareForward.file > king[0] && oneSquareForward.file < threateningPiece[0]) {
                  if (oneSquareForward.rank > king[1] && oneSquareForward.rank < threateningPiece[1]) {
                    allPossibleMoves[this.id].push(oneSquareForward);
                  }
                  else if (oneSquareForward.rank < king[1] && oneSquareForward.rank > threateningPiece[1]) {
                    allPossibleMoves[this.id].push(oneSquareForward);
                  }
                } else if (oneSquareForward.file < king[0] && oneSquareForward.file > threateningPiece[0]) {
                  if (oneSquareForward.rank > king[1] && oneSquareForward.rank < threateningPiece[1]) {
                    allPossibleMoves[this.id].push(oneSquareForward);
                  }
                  else if (oneSquareForward.rank < king[1] && oneSquareForward.rank > threateningPiece[1]) {
                    allPossibleMoves[this.id].push(oneSquareForward);
                  }
                }
              }
            }

            if (!this.hasMoved) {
              if (twoSquaresForward) {
                if (allPossibleMoves[threateningPiece].includes(twoSquaresForward)) {
                  if (twoSquaresForward.file > king[0] && twoSquaresForward.file < threateningPiece[0]) {
                    if (twoSquaresForward.rank > king[1] && twoSquaresForward.rank < threateningPiece[1]) {
                      allPossibleMoves[this.id].push(twoSquaresForward);
                    }
                    else if (twoSquaresForward.rank < king[1] && twoSquaresForward.rank > threateningPiece[1]) {
                      allPossibleMoves[this.id].push(twoSquaresForward);
                    }
                  }
                  else if (twoSquaresForward.file < king[0] && twoSquaresForward.file > threateningPiece[0]) {
                    if (twoSquaresForward.rank > king[1] && twoSquaresForward.rank < threateningPiece[1]) {
                      allPossibleMoves[this.id].push(twoSquaresForward);
                    }
                    else if (twoSquaresForward.rank < king[1] && twoSquaresForward.rank > threateningPiece[1]) {
                      allPossibleMoves[this.id].push(twoSquaresForward);
                    }
                  }
                }
              }
            }

            if (leftDiagonalSquare) {
              if (leftDiagonalSquare.id === threateningPiece) {
                allPossibleMoves[this.id].push(leftDiagonalSquare);
              }
            }
            if (rightDiagonalSquare) {
              if (rightDiagonalSquare.id === threateningPiece) {
                allPossibleMoves[this.id].push(rightDiagonalSquare);
              }
            }
          } break;
          case 'Queen': {
            if (oneSquareForward) {
              if (allPossibleMoves[threateningPiece].includes(oneSquareForward)) {
                if (oneSquareForward.file > king[0] && oneSquareForward.file < threateningPiece[0]) {
                  if (oneSquareForward.rank > king[1] && oneSquareForward.rank < threateningPiece[1]) {
                    allPossibleMoves[this.id].push(oneSquareForward);
                  }
                  else if (oneSquareForward.rank < king[1] && oneSquareForward.rank > threateningPiece[1]) {
                    allPossibleMoves[this.id].push(oneSquareForward);
                  }
                } else if (oneSquareForward.file < king[0] && oneSquareForward.file > threateningPiece[0]) {
                  if (oneSquareForward.rank > king[1] && oneSquareForward.rank < threateningPiece[1]) {
                    allPossibleMoves[this.id].push(oneSquareForward);
                  }
                  else if (oneSquareForward.rank < king[1] && oneSquareForward.rank > threateningPiece[1]) {
                    allPossibleMoves[this.id].push(oneSquareForward);
                  }
                }
              }
            }

            if (!this.hasMoved) {
              if (twoSquaresForward) {
                if (allPossibleMoves[threateningPiece].includes(twoSquaresForward)) {
                  if (twoSquaresForward.file > king[0] && twoSquaresForward.file < threateningPiece[0]) {
                    if (twoSquaresForward.rank > king[1] && twoSquaresForward.rank < threateningPiece[1]) {
                      allPossibleMoves[this.id].push(twoSquaresForward);
                    }
                    else if (twoSquaresForward.rank < king[1] && twoSquaresForward.rank > threateningPiece[1]) {
                      allPossibleMoves[this.id].push(twoSquaresForward);
                    }
                  }
                  else if (twoSquaresForward.file < king[0] && twoSquaresForward.file > threateningPiece[0]) {
                    if (twoSquaresForward.rank > king[1] && twoSquaresForward.rank < threateningPiece[1]) {
                      allPossibleMoves[this.id].push(twoSquaresForward);
                    }
                    else if (twoSquaresForward.rank < king[1] && twoSquaresForward.rank > threateningPiece[1]) {
                      allPossibleMoves[this.id].push(twoSquaresForward);
                    }
                  }
                }
              }
            }

            if (leftDiagonalSquare) {
              if (leftDiagonalSquare.id === threateningPiece) {
                allPossibleMoves[this.id].push(leftDiagonalSquare);
              }
            }
            if (rightDiagonalSquare) {
              if (rightDiagonalSquare.id === threateningPiece) {
                allPossibleMoves[this.id].push(rightDiagonalSquare);
              }
            }
          }
        }
      });
    }
  }
}
