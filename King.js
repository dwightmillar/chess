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

    allPossibleMoves[this.id].push(board[position]);
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
