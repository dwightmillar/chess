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

    let targetPlayer = '';
    let opponent = '';
    let position = `${files[files.findIndex((element) => element === this.file) + horizontal]}${this.rank + vertical}`;

    if (this.player === 'white') {
      opponent = 'black';
    } else {
      opponent = 'white';
    }

    if (board[position]) {
      targetPlayer = board[position].player;
      if(this.player === 'black') {
        // console.log(targetPlayer);
        // console.log(opponent);
      }

      if (!targetPlayer || targetPlayer === opponent) {

        if (this.player === isInCheck) {
          let canMove = true;

          for (let illegalSquare in allPossibleMoves[threateningPiece]) {
            if (board[position].id === allPossibleMoves[threateningPiece][illegalSquare].id) {
              canMove = false;
              break;
            }
          }

          if (!canMove) {
            return null;
          } else {
            allPossibleMoves[this.id].push(board[position]);
          }


        } else {
          allPossibleMoves[this.id].push(board[position]);
        }
      }
    }
  }
}
