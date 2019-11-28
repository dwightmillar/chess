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
    let targetPlayer = '';
    let opponent = '';

    if (this.player === 'white') {
      opponent = 'black';
    } else {
      opponent = 'white';
    }

    if (board[`${files[files.findIndex((element) => element === this.file) - 2]}${this.rank - 1}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) - 2]}${this.rank - 1}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) - 2]}${this.rank - 1}`]);
      }
    }


    if (board[`${files[files.findIndex((element) => element === this.file) - 2]}${this.rank + 1}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) - 2]}${this.rank + 1}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) - 2]}${this.rank + 1}`]);
      }
    }


    if (board[`${files[files.findIndex((element) => element === this.file) + 2]}${this.rank - 1}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + 2]}${this.rank - 1}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + 2]}${this.rank - 1}`]);
      }
    }


    if (board[`${files[files.findIndex((element) => element === this.file) + 2]}${this.rank + 1}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + 2]}${this.rank + 1}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + 2]}${this.rank + 1}`]);
      }
    }


    if (board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank - 2}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank - 2}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank - 2}`]);
      }
    }


    if (board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank + 2}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank + 2}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) - 1]}${this.rank + 2}`]);
      }
    }


    if (board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank - 2}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank - 2}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank - 2}`]);
      }
    }


    if (board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank + 2}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank + 2}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + 1]}${this.rank + 2}`]);
      }
    }
    if (this.player === isInCheck) {
      for (let square in allPossibleMoves[this.id]) {
        if (square.id !== threateningPiece) {
          delete allPossibleMoves[this.id][square];
        }
      }
    }
  }
}
