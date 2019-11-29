class Rook extends Square {
  constructor(file, rank, piece, player, color) {
    super(file, rank, player, color);
    this.hasMoved = false;
    this.piece = $('<div>', {
      class: `${player} Rook`
    })

    this.div = this.div.append(this.piece);

    return this;
  }

  updatePossibleMoves() {
    $(this.piece).click(this.move);
    allPossibleMoves[this.id] = [];

    this.checkMove(0, 1);

    this.checkMove(0, -1);

    this.checkMove(-1, 0);

    this.checkMove(1, 0);

  }

  checkMove(horizontal, vertical) {
    let targetPlayer = '';
    let horizontalSquareCount = horizontal;
    let verticalSquareCount = vertical;
    let opponent = '';

    if (this.player === 'white') {
      opponent = 'black';
    } else {
      opponent = 'white';
    }


    while (board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]) {

      targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`].player;

      if (!targetPlayer || targetPlayer === opponent) {
        allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);
        if (targetPlayer === opponent) {
          break;
        }

      } else {
        break;
      }

      if (horizontalSquareCount < 0) {
        --horizontalSquareCount;
      } else if (horizontalSquareCount > 0) {
        ++horizontalSquareCount;
      }

      if (verticalSquareCount < 0) {
        --verticalSquareCount;
      } else if (verticalSquareCount > 0) {
        ++verticalSquareCount;
      }
    }
  }
}
