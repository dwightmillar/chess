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
    let canMove = true;

    if (this.player === 'white') {
      opponent = 'black';
    } else {
      opponent = 'white';
    }

    if (board[position]) {

      targetPlayer = board[position].player;

      if (!targetPlayer || targetPlayer === opponent) {

        for (let piece in board) {
          if (allPossibleMoves[board[piece].id] && board[piece].player === opponent) {
            if (board[piece] instanceof Pawn) {
              allPossibleMoves[board[piece].id].findIndex((element) => {
                if (element.file === board[piece].file && element.id === position) {
                  allPossibleMoves[this.id].push(board[position]);
                }
              });
            }
            if (allPossibleMoves[board[piece].id].findIndex((element) => element.id === position) !== -1) {
              canMove = false;
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
  }
}
