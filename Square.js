class Square {
  constructor(file, rank, player, color, hasMoved = false) {
    this.file = file;
    this.rank = rank;
    this.id = `${this.file}${this.rank}`,
    this.player = player,
    this.color = color,
    this.hasMoved = hasMoved;
    this.div = $('<div>', {
                  id: this.id,
                  class: `square`,
                  style: `background-color: ${this.color};`
                  });
    this.move = this.move.bind(this);

    return this
  }

  move() {
    if (!this.piece || this.player !== playerTurn) {
      return null;
    }

    let possibleMoves = [];

    if (!activePiece) {

      activePiece = this;
      activePiece.div[0].style.backgroundColor = 'yellow';

      possibleMoves = allPossibleMoves[this.id];
      // console.log('possibleMoves: ',possibleMoves);

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
                board[possibleMoves[move].id] = new Pawn(target.file, target.rank, activePiece.piece, activePiece.player, target.color, true);
              } break;
              case 'Rook': {
                board[possibleMoves[move].id] = new Rook(target.file, target.rank, activePiece.piece, activePiece.player, target.color, true);
              } break;
              case 'Knight': {
                board[possibleMoves[move].id] = new Knight(target.file, target.rank, activePiece.piece, activePiece.player, target.color, true);
              } break;
              case 'Bishop': {
                board[possibleMoves[move].id] = new Bishop(target.file, target.rank, activePiece.piece, activePiece.player, target.color, true);
              } break;
              case 'King': {
                board[possibleMoves[move].id] = new King(target.file, target.rank, activePiece.piece, activePiece.player, target.color, true);
              } break;
              case 'Queen': {
                board[possibleMoves[move].id] = new Queen(target.file, target.rank, activePiece.piece, activePiece.player, target.color, true);
              } break;
            }

            if (playerTurn === 'white') {
              playerTurn = 'black';
            } else {
              playerTurn = 'white';
            }

            loadBoard(board);

            for (let move in possibleMoves) {
              possibleMoves[move].div[0].style.backgroundColor = possibleMoves[move].color;
            }

            for (let piece in allPossibleMoves) {
              for (let space in Object.values(allPossibleMoves[piece])) {
                if (Object.values(allPossibleMoves[piece])[space] instanceof King) {
                  isInCheck = playerTurn;
                  threateningPiece = piece;
                  console.log(`${playerTurn}`[0].toUpperCase() + `${playerTurn.slice(1)} is put in check by ${board[piece].piece[0].classList[1]}[${piece[0].toUpperCase() + piece[1]}]`);
                  loadBoard(board);
                }
              }
            }

            activePiece.div[0].style.backgroundColor = activePiece.color;
            possibleMoves = [];
            activePiece = '';
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
