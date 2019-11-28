class Queen extends Square {
  constructor(file, rank, piece, player, color) {
    super(file, rank, player, color);
    this.piece = $('<div>', {
      class: `${player} Queen`
    })

    this.div = this.div.append(this.piece);

    return this;
  }

  updatePossibleMoves() {
    $(this.piece).click(this.move);
    allPossibleMoves[this.id] = [];
    let targetPlayer = '';
    let opponent = '';
    let squareCount = 1;

    if (this.player === 'white') {
      opponent = 'black';
    } else {
      opponent = 'white';
    }

    while (board[`${this.file}${this.rank + squareCount}`]) {
      targetPlayer = board[`${this.file}${this.rank + squareCount}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${this.file}${this.rank + squareCount}`]);
        if (targetPlayer === opponent) {
          break;
        }
      } else {
        break;
      }
      ++squareCount;
    }

    targetPlayer = '';
    squareCount = 1;

    while (board[`${this.file}${this.rank - squareCount}`]) {
      targetPlayer = board[`${this.file}${this.rank - squareCount}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${this.file}${this.rank - squareCount}`]);
        if (targetPlayer === opponent) {
          break;
        }
      } else {
        break;
      }
      ++squareCount;
    }

    targetPlayer = '';
    squareCount = 1;

    while (board[`${files[files.findIndex((element) => element === this.file) - squareCount]}${this.rank}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) - squareCount]}${this.rank}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) - squareCount]}${this.rank}`]);
        if (targetPlayer === opponent) {
          break;
        }
      } else {
        break;
      }
      ++squareCount;
    }

    targetPlayer = '';
    squareCount = 1;

    while (board[`${files[files.findIndex((element) => element === this.file) + squareCount]}${this.rank}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + squareCount]}${this.rank}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + squareCount]}${this.rank}`]);
        if (targetPlayer === opponent) {
          break;
        }
      } else {
        break;
      }
      ++squareCount;
    }

    targetPlayer = '';
    squareCount = 1;

    while (board[`${files[files.findIndex((element) => element === this.file) - squareCount]}${this.rank - squareCount}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) - squareCount]}${this.rank - squareCount}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) - squareCount]}${this.rank - squareCount}`]);
        if (targetPlayer === opponent) {
          break;
        }
      } else {
        break;
      }
      ++squareCount;
    }

    targetPlayer = '';
    squareCount = 1;

    while (board[`${files[files.findIndex((element) => element === this.file) - squareCount]}${this.rank + squareCount}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) - squareCount]}${this.rank + squareCount}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) - squareCount]}${this.rank + squareCount}`]);
        if (targetPlayer === opponent) {
          break;
        }
      } else {
        break;
      }
      ++squareCount;
    }

    targetPlayer = '';
    squareCount = 1;

    while (board[`${files[files.findIndex((element) => element === this.file) + squareCount]}${this.rank - squareCount}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + squareCount]}${this.rank - squareCount}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + squareCount]}${this.rank - squareCount}`]);
        if (targetPlayer === opponent) {
          break;
        }
      } else {
        break;
      }
      ++squareCount;
    }

    targetPlayer = '';
    squareCount = 1;

    while (board[`${files[files.findIndex((element) => element === this.file) + squareCount]}${this.rank + squareCount}`]) {
      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + squareCount]}${this.rank + squareCount}`].player;
      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + squareCount]}${this.rank + squareCount}`]);
        if (targetPlayer === opponent) {
          break;
        }
      } else {
        break;
      }
      ++squareCount;
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
