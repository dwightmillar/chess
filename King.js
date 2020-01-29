class King extends Square {
  constructor(file, rank, piece, player, color, hasMoved) {
    super(file, rank, player, color, hasMoved);
    this.piece = $('<div>', {
      class: `${player} King`
    })

    this.div = this.div.append(this.piece);

    return this;
  }

  updatePossibleMoves() {
    $(this.piece).click(this.move);
    allPossibleMoves[this.id] = [];

    this.checkMove(0, 1);

    this.checkMove(0, -1);

    this.checkMove(1, 1);

    this.checkMove(1, -1);

    this.checkMove(1, 0);

    this.checkMove(-1, 1);

    this.checkMove(-1, 0);

    this.checkMove(-1, -1);

    if (!this.hasMoved) {
      this.kingsideCastle();
      this.queensideCastle();
    }

  }

  checkMove(horizontal, vertical) {

    let canMove = true;
    let position = `${files[files.findIndex((element) => element === this.file) + horizontal]}${this.rank + vertical}`;

    //return if position being checked doesn't exist
    if (!board[position]) {
      return null;
    }

    let targetPlayer = board[position].player;

    //return if position being checked is the same player
    if (targetPlayer === this.player) {
      return null;
    }

    let opponent = '';

    if (this.player === 'white') {
      opponent = 'black';
    } else {
      opponent = 'white';
    }



//---------------logic--------------------//

    if (isInCheck !== this.player) {
      //for every piece on the board
      for (let piece in board) {
        //if the piece is an opponent
        if (board[piece].player === opponent) {
          //if the piece is a Pawn
          if (board[piece] instanceof Pawn && !(board[piece] instanceof King)) {
            // if the position to be moved to is a possible move of a Pawn,
            if (allPossibleMoves[piece].findIndex(possibleMove => possibleMove.id === position) !== -1) {
              //if the file of the position to be moved to is not the same as the file of the pawn, can't move there
              if (position[0] !== board[piece].file) {
                canMove = false;
              }
            } else {
              //if it's not a possible move of the Pawn, then you won't be checking for anything
              continue;
            }


          }
          else {
            // if the position to be moved to is a possible move of an opposing piece, you can't move there
            if (allPossibleMoves[piece].findIndex(element => element.id === position) !== -1) {
              canMove = false;
              break;
            }
          }
        }
      }

      //if no opposing piece has possible moves for that position, the King can move there
      if (canMove) {
        allPossibleMoves[this.id].push(board[position]);
      }
    } else {
      //for every piece on the board
      for (let piece in board) {
        let firstDiagonal = '';
        let secondDiagonal = '';
        //if the piece is an opponent
        if (board[piece].player === opponent) {
          //if the piece is a Pawn
          if (board[piece] instanceof Pawn) {
            // if the position to be moved to is a possible move of a Pawn,
            if (allPossibleMoves[piece].findIndex(element => element.id === position) !== -1) {
              // identify the diagonal moves of the Pawn
              for (let possibleMove in allPossibleMoves[piece]) {
                if (allPossibleMoves[piece][possibleMove].id[0] !== board[piece].id[0]) {
                  if (!firstDiagonal) {
                    firstDiagonal = allPossibleMoves[piece][possibleMove].id;
                  } else {
                    secondDiagonal = allPossibleMoves[piece][possibleMove].id;
                  }
                }
              }
              // and check if the position to be moved to is a diagonal move
              if (position === firstDiagonal || position === secondDiagonal) {
                canMove = false;
              } else {
                continue;
              }
            } else {
              //if it's not a possible move of the Pawn, then you won't be checking for anything
              continue;
            }


          } else {
            // if the position to be moved to is a possible move of an opposing piece, you can't move there
            if (allPossibleMoves[piece].findIndex(element => element.id === position) !== -1) {
              canMove = false;
            }
            threateningPieces.forEach(threateningPiece => {
              //if in check the position to be moved to is a potential move of an opposing piece, you can't move there
              if (allPotentialMoves[threateningPiece]) {
                if (allPotentialMoves[threateningPiece].findIndex(element => element.id === position) !== -1) {
                  canMove = false;
                }
              }
            })
          }
        }
      }

      //if no opposing piece has possible moves for that position, the King can move there
      if (canMove) {
        allPossibleMoves[this.id].push(board[position]);
      }
    }
  }

  kingsideCastle() {
    for (let space in board) {
      if (board[space] instanceof Rook && board[space].player === this.player && board[space].file === 'h') {
        if (!board[space].hasMoved) {
          if (!board[`f${space[1]}`].piece && !board[`g${space[1]}`].piece) {
            for (let piece in allPossibleMoves) {
              if (board[piece].player !== this.player && allPossibleMoves[piece].includes(board[`g${space[1]}`])) {
                return;
              }
            }
            allPossibleMoves[this.id].push(board[`g${space[1]}`]);

          }
        }
      }
    }
  }

  queensideCastle() {
    for (let space in board) {
      if (board[space] instanceof Rook && board[space].player === this.player && board[space].file === 'a') {
        if (!board[space].hasMoved) {

          if (!board[`b${space[1]}`].piece && !board[`c${space[1]}`].piece && !board[`d${space[1]}`].piece) {
            for (let piece in allPossibleMoves) {
              if (board[piece].player !== this.player && allPossibleMoves[piece].includes(board[`c${space[1]}`])) {
                return;
              }
            }
            allPossibleMoves[this.id].push(board[`c${space[1]}`]);

          }
        }
      }
    }
  }
}
