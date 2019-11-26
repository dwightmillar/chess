class Square {
  constructor(file, rank, player, color) {
    this.file = file;
    this.rank = rank;
    this.id = `${this.file}${this.rank}`,
    this.player = player,
    this.color = color
    this.div = $('<div>', {
                  id: this.id,
                  class: `square`,
                  style: `background-color: ${this.color};`
                  });


    return this
  }

  move(event) {
    if (!this.piece) {
      return null;
    }

    let possibleMoves = [];

    if (!activePiece) {

      activePiece = this;
      activePiece.div[0].style.backgroundColor = 'yellow';

      possibleMoves = allPossibleMoves[this.id];

      if (possibleMoves[0]) {
        for (let move in possibleMoves) {
          possibleMoves[move].div[0].style.backgroundColor = 'cyan';
          $(`#${possibleMoves[move].div[0].id}`).click(function () {
            if (!activePiece) {
              return;
            }
            var target = board[possibleMoves[move].id];

            board[activePiece.id] = new Square(activePiece.file, activePiece.rank, '', activePiece.color);
            switch (activePiece.piece[0].classList[1]) {
              case 'Pawn': {
                board[possibleMoves[move].id] = new Pawn(target.file, target.rank, activePiece.piece, activePiece.player, target.color);
              } break;
              case 'Rook': {
                board[possibleMoves[move].id] = new Rook(target.file, target.rank, activePiece.piece, activePiece.player, target.color);
              } break;
              case 'Knight': {
                board[possibleMoves[move].id] = new Knight(target.file, target.rank, activePiece.piece, activePiece.player, target.color);
              } break;
              case 'Bishop': {
                board[possibleMoves[move].id] = new Bishop(target.file, target.rank, activePiece.piece, activePiece.player, target.color);
              } break;
              case 'King': {
                board[possibleMoves[move].id] = new King(target.file, target.rank, activePiece.piece, activePiece.player, target.color);
              } break;
              case 'Queen': {
                board[possibleMoves[move].id] = new Queen(target.file, target.rank, activePiece.piece, activePiece.player, target.color);
              } break;
            }
            for (let move in possibleMoves) {
              possibleMoves[move].div[0].style.backgroundColor = possibleMoves[move].color;
            }
            activePiece.div[0].style.backgroundColor = activePiece.color;
            possibleMoves = [];
            activePiece = '';
            loadBoard(board);
          });
        }
      }
    } else if (activePiece === this) {
      activePiece.div[0].style.backgroundColor = activePiece.color;

      activePiece = '';
      possibleMoves = allPossibleMoves[this.id];

      for (let move in possibleMoves) {
        possibleMoves[move].div[0].style.backgroundColor = possibleMoves[move].color;
        $(`#${possibleMoves[move].div[0].id}`).off();
      }
    }
  }
}
