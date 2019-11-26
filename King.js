class King extends Square {
  constructor(file, rank, piece, player, color) {
    super(file, rank, player, color);
    this.hasMoved = false;
    this.move = this.move.bind(this);
    this.piece = $('<div>', {
      class: `${player} King`
    })

    this.div = this.div.append(this.piece);

    return this;
  }

  updatePossibleMoves() {
    $(this.piece).click(this.move);
    allPossibleMoves[this.id] = [];
    let targetPlayer = '';
    let opponent = '';

    if (this.player === 'white') {
      opponent = 'black';
    } else {
      opponent = 'white';
    }

    if (board[`${this.file}${this.rank + 1}`]) {
      targetPlayer = board[`${this.file}${this.rank + 1}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${this.file}${this.rank + 1}`]);
      }
    }

    targetPlayer = '';

    if (board[`${this.file}${this.rank - 1}`]) {
      targetPlayer = board[`${this.file}${this.rank - 1}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${this.file}${this.rank - 1}`]);
      }
    }

    targetPlayer = '';

    if (board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank}`]);
      }
    }

    targetPlayer = '';

    if (board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank}`]);
      }
    }

    targetPlayer = '';

    if (board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank - 1}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank - 1}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank - 1}`]);
      }
    }

    targetPlayer = '';

    if (board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank + 1}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank + 1}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank + 1}`]);
      }
    }

    targetPlayer = '';

    if (board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank - 1}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank - 1}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank - 1}`]);
      }
    }

    targetPlayer = '';

    if (board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank + 1}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank + 1}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank + 1}`]);
      }
    }
  }
}
