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

    for (let piece in board) {
      if (board[piece].player === opponent) {
        if (board[piece] instanceof Pawn) {
          // if (this.id === "h5" && position === "g5") {
          //   debugger;
          // }

          // if the position of the square to be moved to is a possible move of a Pawn,
          if (allPossibleMoves[piece].findIndex(element => element.id === position) !== -1) {
            // and if the file of the square to be moved to is the same as the file of the Pawn,
            if (allPossibleMoves[piece].findIndex(element => element.file === piece[0]) === -1) {
              //then make it a valid move
              return;
            }
          }
        } else {
          if (allPossibleMoves[piece].findIndex(element => element.id === position) !== -1) {
            canMove = false;
          }
        }
      }
    }

    if (canMove) {
      allPossibleMoves[this.id].push(board[position]);
    }

    if (board[position].id === threateningPiece) {
      allPossibleMoves[this.id].push(board[position]);
    }
  }
}
