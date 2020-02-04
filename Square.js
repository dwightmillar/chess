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
    let king = null;

    if (!activePiece) {

      activePiece = this;
      activePiece.div[0].style.backgroundImage = 'radial-gradient(white, yellow)';

      possibleMoves = allPossibleMoves[this.id];

      // KING DEFINITON

      for (let piece in board) {
        if (board[piece] instanceof King && board[piece].player !== this.player) {
          king = piece;
          break;
        }
      }

      if (activePiece instanceof Pawn) {
        if (possibleMoves[0]) {
          for (let move in possibleMoves) {
            if (possibleMoves[move].file === activePiece.file || (possibleMoves[move].player && possibleMoves[move].player !== this.player)) {
              possibleMoves[move].div[0].style.backgroundImage = 'radial-gradient(white, teal)';
              $(`#${possibleMoves[move].div[0].id}`).click(() => this.moveTo(possibleMoves, move));
            }
          }
        }
      } else if (activePiece instanceof Knight) {
        if (possibleMoves[0]) {
          for (let move in possibleMoves) {
            if (possibleMoves[move].player !== this.player) {
              possibleMoves[move].div[0].style.backgroundImage = 'radial-gradient(white, teal)';
              $(`#${possibleMoves[move].div[0].id}`).click(() => this.moveTo(possibleMoves, move));
            }
          }
        }
      } else if (activePiece instanceof King) {
        for (let move in possibleMoves) {
          let canMove = true;
          //for every piece on the board
          for (let piece in board) {
            //if the piece is an opponent
            if (board[piece].player && board[piece].player !== this.player) {
              //if the piece is a Pawn
              if (board[piece] instanceof Pawn) {
                // if the position to be moved to is a possible move of a Pawn,
                if (allPossibleMoves[piece].includes(possibleMoves[move])) {
                  //if the file of the position to be moved to is not the same as the file of the pawn, can't move there
                  if (possibleMoves[move].file !== board[piece].file) {
                    canMove = false;
                    break;
                  }
                } else {
                  //if it's not a possible move of the Pawn, then you won't be checking for anything
                  continue;
                }


              }
              else {
                // if the position to be moved to is a possible move of an opposing piece, you can't move there
                if (allPossibleMoves[piece].includes(possibleMoves[move])) {
                  canMove = false;
                  break;
                }
              }
            }
          }

          if (isInCheck === this.player) {

            for (let blockingPiece in blockingPieces) {

              if (blockingPieces[blockingPiece].includes(this)) {

                if (allPotentialMoves[blockingPiece].includes(possibleMoves[move])) {

                  if (this.file === blockingPiece[0]) {
                    if (possibleMoves[move].file !== blockingPiece[0]) {
                      continue;
                    }
                  } else if (this.file < blockingPiece[0]) {
                    if (possibleMoves[move].file >= this.file || possibleMoves[move].file >= blockingPiece[0]) {
                      continue;
                    }
                  } else if (this.file > blockingPiece[0]) {
                    if (possibleMoves[move].file <= this.file || possibleMoves[move].file <= blockingPiece[0]) {
                      continue;
                    }
                  }


                  if (this.rank === blockingPiece[1]) {
                    if (possibleMoves[move].rank !== blockingPiece[1]) {
                      continue;
                    }
                  } else if (this.rank < blockingPiece[1]) {
                    if (possibleMoves[move].rank >= this.rank || possibleMoves[move].rank >= blockingPiece[1]) {
                      continue;
                    }
                  } else if (this.rank > blockingPiece[1]) {
                    if (possibleMoves[move].rank <= this.rank || possibleMoves[move].rank <= blockingPiece[1]) {
                      continue;
                    }
                  }

                  canMove = false;
                  break;
                }
              }
            }
          }

          //if no opposing piece has possible moves for that position, the King can move there
          if (canMove && possibleMoves[move].player !== this.player && !allPossibleMoves[king].includes(possibleMoves[move])) {
            possibleMoves[move].div[0].style.backgroundImage = 'radial-gradient(white, teal)';
            $(`#${possibleMoves[move].div[0].id}`).click(() => this.moveTo(possibleMoves, move));
          }
        }


      }

      else {
        if (possibleMoves.length > 0) {
          for (let move in possibleMoves) {
            if (possibleMoves[move].player !== this.player) {
              possibleMoves[move].div[0].style.backgroundImage = 'radial-gradient(white, teal)';
              $(`#${possibleMoves[move].div[0].id}`).click(() => this.moveTo(possibleMoves, move));
            }
          }
        }
      }

    } else if (activePiece === this) {
      activePiece.div[0].style.backgroundImage = null;

      activePiece = '';
      possibleMoves = allPossibleMoves[this.id];

      for (let move in possibleMoves) {
        possibleMoves[move].div[0].style.backgroundImage = null;
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

    if (activePiece instanceof King && !activePiece.hasMoved && (target.file === 'c' || target.file === 'g')) {
      board[possibleMoves[move].id] = new King(target.file, target.rank, activePiece.piece, activePiece.player, target.color, true);

      if (target.file === 'c') {

        board[`d${target.rank}`] = new Rook('d', target.rank, activePiece.piece, activePiece.player, board[`d${target.rank}`].color, true);
        board[`a${target.rank}`] = new Square('a', target.rank, activePiece.player, target.color);

      } else {

        board[`f${target.rank}`] = new Rook('f', target.rank, activePiece.piece, activePiece.player, board[`f${target.rank}`].color, true);
        board[`h${target.rank}`] = new Square('h', target.rank, activePiece.player, board[`h${target.rank}`].color, true);

      }

      switchTurns();
      loadBoard(board);
      checkForCheck();
      checkBlockingPieces();

    } else if (activePiece instanceof Pawn && (target.rank === 1 || target.rank === 8)){
      board[possibleMoves[move].id] = new Pawn(target.file, target.rank, activePiece.piece, activePiece.player, target.color, true);
      $('#pieceSelection').show();
      $('#pieceSelection')[0].children[0].children[0].id = possibleMoves[move].id;

      $('#selectBishop').click(function() {
        let pawn = this.parentElement.children[0].id;
        board[pawn] = new Bishop(pawn[0], parseInt(pawn[1]), null, board[pawn].player, board[pawn].color, true);

        switchTurns();
        loadBoard(board);
        checkForCheck();
        checkBlockingPieces();

        $('#pieceSelection').hide();

      });
      $('#selectRook').click(function() {
        let pawn = this.parentElement.children[0].id;
        board[pawn] = new Rook(pawn[0], parseInt(pawn[1]), null, board[pawn].player, board[pawn].color, true);

        switchTurns();
        loadBoard(board);
        checkForCheck();
        checkBlockingPieces();

        $('#pieceSelection').hide();

      });
      $('#selectQueen').click(function() {
        let pawn = this.parentElement.children[0].id;
        board[pawn] = new Queen(pawn[0], parseInt(pawn[1]), null, board[pawn].player, board[pawn].color, true);

        switchTurns();
        loadBoard(board);
        checkForCheck();
        checkBlockingPieces();

        $('#pieceSelection').hide();
      });
      $('#selectKnight').click(function () {
        let pawn = this.parentElement.children[0].id;
        board[pawn] = new Knight(pawn[0], parseInt(pawn[1]), null, board[pawn].player, board[pawn].color, true);

        switchTurns();
        loadBoard(board);
        checkForCheck();
        checkBlockingPieces();

        $('#pieceSelection').hide();

      });

    } else {
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

      switchTurns();
      loadBoard(board);
      checkForCheck();
      checkBlockingPieces();

    }

    threateningPieces = [];
    // blockingPieces = {};


    for (let move in possibleMoves) {
      possibleMoves[move].div[0].style.backgroundImage = null;
    }

    activePiece.div[0].style.backgroundImage = null;
    possibleMoves = [];
    activePiece = '';
  }
}
