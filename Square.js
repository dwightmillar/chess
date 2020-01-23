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
    allPossibleMoves[this.id] = [];

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

      if (activePiece instanceof Pawn) {
        if (possibleMoves[0]) {
          for (let move in possibleMoves) {
            if (possibleMoves[move].file === activePiece.file || (possibleMoves[move].player && possibleMoves[move].player !== this.player)) {
              possibleMoves[move].div[0].style.backgroundColor = 'cyan';
              $(`#${possibleMoves[move].div[0].id}`).click(() => this.moveTo(possibleMoves, move));
            }
          }
        }
      } else {
        if (possibleMoves.length > 0) {
          for (let move in possibleMoves) {
            if (possibleMoves[move].player !== this.player) {
              possibleMoves[move].div[0].style.backgroundColor = 'cyan';
              $(`#${possibleMoves[move].div[0].id}`).click(() => this.moveTo(possibleMoves, move));
            }
          }
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



  moveTo(possibleMoves, move) {
    if (!activePiece) {
      return;
    }
    var target = board[possibleMoves[move].id];
    let king = null;

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

    isInCheck = '';
    threateningPieces = [];
    blockingPieces = {};

    loadBoard(board);

    for (let move in possibleMoves) {
      possibleMoves[move].div[0].style.backgroundColor = possibleMoves[move].color;
    }

    for (let piece in allPossibleMoves) {
      for (let space in Object.values(allPossibleMoves[piece])) {
        if (Object.values(allPossibleMoves[piece])[space] instanceof King && Object.values(allPossibleMoves[piece])[space].player !== board[piece].player) {
          isInCheck = Object.values(allPossibleMoves[piece])[space].player;
          threateningPieces.push(piece);
          console.log(`${playerTurn}`[0].toUpperCase() + `${playerTurn.slice(1)} is put in check by ${board[piece].piece[0].classList[1]}[${piece[0].toUpperCase() + piece[1]}]`);
          loadBoard(board);
        }
      }
    }

    // KING DEFINITON

    for (let piece in board) {
      if (board[piece] instanceof King && board[piece].player !== this.player) {
        king = piece;
        break;
      }
    }

    //"let piece" is a potentially threatening piece
    for (let piece in blockingPieces) {
      //if the potentially threatening piece has any blocking pieces
      if (blockingPieces[piece].length > 0) {
        //for each blocking piece
        blockingPieces[piece].forEach(square => {

          //what is the threatening piece?
          switch (board[piece].constructor) {
            case Rook: {
              for (let move in allPossibleMoves[square.id]) {
                if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) && (allPossibleMoves[square.id][move].file === king.file || allPossibleMoves[square.id][move].rank === king.rank)) {
                  break;
                } else {
                  delete allPossibleMoves[square.id][move];
                }
              }
            }
            break;
            case Bishop: {
              //for each possible move of the blocking piece
              for (let move in allPossibleMoves[square.id]) {
                //"piece" is potentially threatening piece, "square" is the blocking piece,
                // "move" is a possible move of the blocking piece
                // debugger;

                if (piece[0] > allPossibleMoves[square.id][move].file && square.file < allPossibleMoves[square.id][move].file) {
                  if (piece[1] > allPossibleMoves[square.id][move].rank && square.rank < allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      continue;
                    }
                  }
                  if (piece[1] < allPossibleMoves[square.id][move].rank && square.rank > allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      continue;
                    }
                  }
                }
                else if (piece[0] < allPossibleMoves[square.id][move].file && square.file > allPossibleMoves[square.id][move].file) {
                  if (piece[1] > allPossibleMoves[square.id][move].rank && square.rank < allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      continue;
                    }
                  }
                  if (piece[1] < allPossibleMoves[square.id][move].rank && square.rank > allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      continue;
                    }
                  }
                }
                else if (allPossibleMoves[square.id][move].id === piece) {
                  continue;
                }
                else {
                  delete allPossibleMoves[square.id][move];
                }
              }
            }
            break;
            case Queen: {

              for (let move in allPossibleMoves[square.id]) {
                //"piece" is potentially threatening piece, "square" is the blocking piece,
                // "move" is a possible move of the blocking piece
                if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move])) {

                  if ((files.findIndex(element => element === allPossibleMoves[square.id][move].file) > files.findIndex(element => element === piece[0])) && (files.findIndex(element => element === allPossibleMoves[square.id][move].file) > files.findIndex(element => element === king[0]))) {
                    break;
                  }
                  if ((files.findIndex(element => element === allPossibleMoves[square.id][move].file) < files.findIndex(element => element === piece[0])) && (files.findIndex(element => element === allPossibleMoves[square.id][move].file) < files.findIndex(element => element === king[0]))) {
                    break;
                  }
                  if (allPossibleMoves[square.id][move].rank > piece[1] && allPossibleMoves[square.id][move].rank > king[1]) {
                    break;
                  }
                  if (allPossibleMoves[square.id][move].rank < piece[1] && allPossibleMoves[square.id][move].rank < king[1]) {
                    break;
                  }
                  if (allPossibleMoves[square.id][move].id === piece) {
                    break;
                  }
                  if (allPossibleMoves[square.id][move].file === king[0] || allPossibleMoves[square.id][move].rank === king[1]) {
                    break;
                  }
                } else {
                  delete allPossibleMoves[square.id][move];
                }
              }
              console.log(allPossibleMoves[square.id]);
            }
            break;
          }
        });
      }
    }

    if (isInCheck) {
      let moveCounter = 0;
      for (let square in board) {
        if (board[square].player === isInCheck) {
          moveCounter += allPossibleMoves[square].length;
        }
      }
      if (moveCounter === 0) {
        console.log('Checkmate!');
        playerTurn = null;
      }
    }

    activePiece.div[0].style.backgroundColor = activePiece.color;
    possibleMoves = [];
    activePiece = '';
  }
}
