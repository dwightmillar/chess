class Knight extends Square {
  constructor(file, rank, piece, player, color) {
    super(file, rank, player, color);
    this.piece = $('<div>', {
      class: `${player} Knight`
    })

    this.div = this.div.append(this.piece);

    return this;
  }

  updatePossibleMoves() {
    $(this.piece).click(this.move);
    allPossibleMoves[this.id] = [];

    this.checkMove(-2, -1);

    this.checkMove(-2, 1);

    this.checkMove(2, -1);

    this.checkMove(2, 1);

    this.checkMove(-1, -2);

    this.checkMove(-1, 2);

    this.checkMove(1, -2);

    this.checkMove(1, 2);

  }

  checkMove(horizontal, vertical) {
    let targetPlayer = '';
    let opponent = '';

    if (this.player === 'white') {
      opponent = 'black';
    } else {
      opponent = 'white';
    }

    if (board[`${files[files.findIndex((element) => element === this.file) + horizontal]}${this.rank + vertical}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + horizontal]}${this.rank + vertical}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontal]}${this.rank + vertical}`]);
      }
    }
  }
}
