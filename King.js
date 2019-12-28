class King extends Square {
  constructor(file, rank, piece, player, color) {
    super(file, rank, player, color);
    this.hasMoved = false;
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


    //for every piece on the board
    for (let piece in board) {
      let firstDiagonal = '';
      let secondDiagonal = '';
      let pawn = '';
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
                  pawn = board[piece];
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
          // if the position to be moved to is a possible move of an opppsing piece, you can't move there
          if (allPossibleMoves[piece].findIndex(element => element.id === position) !== -1) {
            canMove = false;
          }
        }
      }
    }

    //if no opposing piece has possible moves for that position, the King can move there
    if (canMove) {
      allPossibleMoves[this.id].push(board[position]);
    }
  }
}
