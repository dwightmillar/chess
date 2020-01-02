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
    let position = `${files[files.findIndex((element) => element === this.file) + horizontal]}${this.rank + vertical}`;

    if (this.player === 'white') {
      opponent = 'black';
    } else {
      opponent = 'white';
    }

    if (isInCheck !== this.player) {
      if (board[position]) {
        targetPlayer = board[position].player;
        if (!targetPlayer || targetPlayer === opponent) {
          allPossibleMoves[this.id].push(board[position]);
        }
      }
    } else {

      let blockingMoves = [];

      let king = null;

      let rankLimit = null;
      let rankIndex = null;

      let fileLimit = null;
      let fileIndex = null;

      let fileOffset = null;

      // KING DEFINITON

      for (let piece in board) {
        if (board[piece] instanceof King && board[piece].player !== this.player) {
          king = piece;
          break;
        }
      }

      threateningPieces.forEach(threateningPiece => {
        // RANKLIMIT/RANKINDEX DEFINITON

        parseInt(threateningPiece[1]) > parseInt(king[1]) ?
          rankLimit = parseInt(threateningPiece[1]) :
          rankLimit = parseInt(king[1]);

        parseInt(threateningPiece[1]) < parseInt(king[1]) ?
          rankIndex = parseInt(threateningPiece[1]) :
          rankIndex = parseInt(king[1]);

        // FILELIMIT/FILEINDEX DEFINITION

        files.findIndex((element) => element === threateningPiece[0]) > files.findIndex((element) => element === king[0]) ?
          fileLimit = files.findIndex((element) => element === threateningPiece[0]) :
          fileLimit = files.findIndex((element) => element === king[0]);

        files.findIndex((element) => element === threateningPiece[0]) < files.findIndex((element) => element === king[0]) ?
          fileIndex = files.findIndex((element) => element === threateningPiece[0]) :
          fileIndex = files.findIndex((element) => element === king[0]);

        // BLOCKINGMOVES DEFINITION

        switch (board[threateningPiece].constructor.name) {
          case 'Rook': {

            if (rankIndex === rankLimit) {
              for (fileIndex; fileIndex < fileLimit; fileIndex++) {
                blockingMoves.push(`${files[fileIndex]}${rankIndex}`);
              }
            } else {
              for (rankIndex; rankIndex < rankLimit; rankIndex++) {
                blockingMoves.push(`${files[fileIndex]}${rankIndex}`);
              }
            }

          } break;
          case 'Bishop': {
            fileOffset = 0;

            for (rankIndex; rankIndex < rankLimit; rankIndex++) {
              blockingMoves.push(`${files[fileIndex + fileOffset]}${rankIndex}`);
              ++fileOffset;
            }

          } break;
          case 'Queen': {
            fileOffset = 0;

            if (rankIndex === rankLimit) {
              for (fileIndex; fileIndex < fileLimit; fileIndex++) {
                blockingMoves.push(`${files[fileIndex]}${rankIndex}`);
              }
            }

            else if (fileIndex === fileLimit) {
              for (rankIndex; rankIndex < rankLimit; rankIndex++) {
                blockingMoves.push(`${files[fileIndex]}${rankIndex}`);
              }
            }

            else {
              for (rankIndex; rankIndex < rankLimit; rankIndex++) {
                blockingMoves.push(`${files[fileIndex + fileOffset]}${rankIndex}`);
                ++fileOffset;
              }
            }
          }
        }

        if (board[position]) {
          targetPlayer = board[position].player;
          if (!targetPlayer || targetPlayer === opponent) {
            if (blockingMoves.findIndex((element) => element === board[position].id) > 0) {
              allPossibleMoves[this.id].push(board[position]);
            }
            if (board[position].id === threateningPiece) {
              allPossibleMoves[this.id].push(board[position]);
            }
          }
        }
      })
    }
  }
}
