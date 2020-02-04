
  let rank = '';
  let allPossibleMoves = {};
  let allPotentialMoves = {};
  let activePiece = '';
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const pieces = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook'];
  let playerTurn = 'white';
  let isInCheck = '';
  let threateningPieces = [];
  let blockingPieces = {};



  let board = new Board();

  window.onload = loadBoard(board);

if (playerTurn) {
  console.log(`It's ${playerTurn}'s turn!`);
}

  function loadBoard(boardData) {

    let squares = [];

    $('.file').remove();

    for (let squareIndex in boardData) {
      squares.push(boardData[squareIndex]);
      if (!boardData[squareIndex].updatePossibleMoves) {
        continue;
      }
      if (!(boardData[squareIndex] instanceof King)) {
        boardData[squareIndex].updatePossibleMoves();
      }
    }

    for (let squareIndex in boardData) {
      if (!boardData[squareIndex].updatePossibleMoves) {
        continue;
      }
      if (boardData[squareIndex] instanceof King) {
        boardData[squareIndex].updatePossibleMoves();
      }
    }


    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      rank = $("<div/>", { class: 'file' })
      for (let squareIndex = 0; squareIndex < 8; squareIndex++) {
        rank.append(squares[(rankIndex * 8) + squareIndex].div);
      }
      $('main').append(rank);
    }
  }



function checkBlockingPieces() {

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

        //if the blocking piece is a king
        if (square instanceof King) {
          //what is the threatening piece?
          switch (board[piece].constructor) {
            case Rook: {
              //for every move of the king
              for (let move in allPossibleMoves[square.id]) {
                if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) && (allPossibleMoves[square.id][move].file === king.file || allPossibleMoves[square.id][move].rank === king.rank)) {
                  delete allPossibleMoves[square.id][move];
                } else {
                  continue;
                }
              }
            }
              break;
            case Bishop: {
              //for each possible move of the blocking piece
              for (let move in allPossibleMoves[square.id]) {
                //"piece" is potentially threatening piece, "square" is the blocking piece,
                // "move" is a possible move of the blocking piece

                if (piece[0] > allPossibleMoves[square.id][move].file && square.file < allPossibleMoves[square.id][move].file) {
                  if (piece[1] > allPossibleMoves[square.id][move].rank && square.rank < allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      delete allPossibleMoves[square.id][move];
                    }
                  }
                  if (piece[1] < allPossibleMoves[square.id][move].rank && square.rank > allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      delete allPossibleMoves[square.id][move];
                    }
                  }
                }
                else if (piece[0] < allPossibleMoves[square.id][move].file && square.file > allPossibleMoves[square.id][move].file) {
                  if (piece[1] > allPossibleMoves[square.id][move].rank && square.rank < allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      delete allPossibleMoves[square.id][move];
                    }
                  }
                  if (piece[1] < allPossibleMoves[square.id][move].rank && square.rank > allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      delete allPossibleMoves[square.id][move];
                    }
                  }
                }
                else if (allPossibleMoves[square.id][move].id === piece) {
                  continue;
                }
                else {
                  continue;
                }
              }
            } break;
            case Queen: {
              //for each possible move of the king
              for (let move in allPossibleMoves[square.id]) {
                //"piece" is potentially threatening piece, "square" is the blocking piece,
                // "move" is a possible move of the king

                if (piece[0] > allPossibleMoves[square.id][move].file && square.file < allPossibleMoves[square.id][move].file) {
                  if (piece[1] > allPossibleMoves[square.id][move].rank && square.rank < allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      delete allPossibleMoves[square.id][move];
                    }
                  }
                  if (piece[1] < allPossibleMoves[square.id][move].rank && square.rank > allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      delete allPossibleMoves[square.id][move];
                    }
                  }
                }
                else if (piece[0] < allPossibleMoves[square.id][move].file && square.file > allPossibleMoves[square.id][move].file) {
                  if (piece[1] > allPossibleMoves[square.id][move].rank && square.rank < allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      delete allPossibleMoves[square.id][move];
                    }
                  }
                  if (piece[1] < allPossibleMoves[square.id][move].rank && square.rank > allPossibleMoves[square.id][move].rank) {
                    if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) || allPossibleMoves[square.id][move].id === piece) {
                      delete allPossibleMoves[square.id][move];
                    }
                  }
                }
                else if (allPossibleMoves[square.id][move].file === king.file || allPossibleMoves[square.id][move].rank === king.rank) {
                  if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move])) {
                    delete allPossibleMoves[square.id][move];
                  }
                }
                else if (allPossibleMoves[square.id][move].id === piece) {
                  continue;
                }
                else {
                  continue;
                }
              }
            }
              break;
          } //end of switch
        } else {
          //what is the threatening piece?
          switch (board[piece].constructor) {
            case Rook: {
              for (let move in allPossibleMoves[square.id]) {
                if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move]) && (allPossibleMoves[square.id][move].file === king.file || allPossibleMoves[square.id][move].rank === king.rank)) {
                  continue;
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
            } break;
            case Queen: {
              //for each possible move of the blocking piece
              for (let move in allPossibleMoves[square.id]) {
                //"piece" is potentially threatening piece, "square" is the blocking piece,
                // "move" is a possible move of the blocking piece

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
                else if (allPossibleMoves[square.id][move].file === king.file || allPossibleMoves[square.id][move].rank === king.rank) {
                  if (allPossibleMoves[piece].includes(allPossibleMoves[square.id][move])) {
                    continue;
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
          }
        }
      });
    }
  }
}

function checkForCheck() {
  let checkMessage = null;
  let numberOfWhiteMoves = 0;
  let numberOfBlackMoves = 0;
  let king = null;
  isInCheck = '';

  for (let piece in board) {
    if (board[piece] instanceof King && board[piece].player !== this.player) {
      king = piece;
      break;
    }
  }


  for (let piece in allPossibleMoves) {
    for (let space in Object.values(allPossibleMoves[piece])) {
      if (Object.values(allPossibleMoves[piece])[space] instanceof King && Object.values(allPossibleMoves[piece])[space].player !== board[piece].player) {
        isInCheck = Object.values(allPossibleMoves[piece])[space].player;
        threateningPieces.push(piece);
        checkMessage = `${playerTurn}`[0].toUpperCase() + `${playerTurn.slice(1)} is put in check by ${board[piece].piece[0].classList[1]}[${piece[0].toUpperCase() + piece[1]}]`;
      }
    }
  }

  loadBoard(board);

  if (isInCheck) {

    console.log(checkMessage);

    let moveCounter = 0;

    //for every square on the board
    for (let square in board) {
      //if it's controlled by the checked player
      if (board[square].player === isInCheck) {

        //add up all the possible moves of non-King pieces
        if (!(board[square] instanceof King)) {

          moveCounter += allPossibleMoves[square].length;

        } else if (board[square] instanceof King) {
          // debugger;

          //for every possible move of the King
          for (let move in allPossibleMoves[square]) {
            let canMove = true;
            //for every piece on the board
            for (let piece in board) {
              //if the piece is an opponent
              if (board[piece].player && board[piece].player !== isInCheck) {

                //if the piece is a Pawn
                if (board[piece] instanceof Pawn) {
                  // if the position to be moved to is a possible move of a Pawn,
                  if (allPossibleMoves[piece].includes(allPossibleMoves[square][move])) {
                    //if the file of the position to be moved to is not the same as the file of the pawn, can't move there
                    if (allPossibleMoves[square][move].file !== board[piece].file) {
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
                  if (allPossibleMoves[piece].includes(allPossibleMoves[square][move])) {
                    canMove = false;
                    break;
                  }
                }
              }
            }
            //if no opposing piece has possible moves for that position, the King can move there
            if (canMove && allPossibleMoves[square][move].player !== board[square].player) {
              ++moveCounter;
            }
          }
        }
      }
    }
    if (moveCounter === 0) {
      console.log('Checkmate!');
      playerTurn = null;
    }
  } else {
    let whiteMoveCount = 0;
    let blackMoveCount = 0;
    //for every square on the board
    for (let square in board) {
      //if it's controlled by the checked player
      if (board[square].player === 'white') {

        //add up all the possible moves of non-King pieces
        if (!(board[square] instanceof King)) {

          whiteMoveCount += allPossibleMoves[square].length;

        } else if (board[square] instanceof King) {
          //for every possible move of the King
          for (let move in allPossibleMoves[square]) {
            let canMove = true;
            //for every piece on the board
            for (let piece in board) {
              //if the piece is an opponent
              if (board[piece].player && board[piece].player !== 'white') {

                //if the piece is a Pawn
                if (board[piece] instanceof Pawn) {
                  // if the position to be moved to is a possible move of a Pawn,
                  if (allPossibleMoves[piece].includes(allPossibleMoves[square][move])) {
                    //if the file of the position to be moved to is not the same as the file of the pawn, can't move there
                    if (allPossibleMoves[square][move].file !== board[piece].file) {
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
                  if (allPossibleMoves[piece].includes(allPossibleMoves[square][move])) {
                    canMove = false;
                    break;
                  }
                }
              }
            }
            //if no opposing piece has possible moves for that position, the King can move there
            if (canMove) {
              ++whiteMoveCount;
            }
          }
        }
      } else if (board[square].player === 'black') {

        //add up all the possible moves of non-King pieces
        if (!(board[square] instanceof King)) {

          blackMoveCount += allPossibleMoves[square].length;

        } else if (board[square] instanceof King) {

          //for every possible move of the King
          for (let move in allPossibleMoves[square]) {
            let canMove = true;
            //for every piece on the board
            for (let piece in board) {
              //if the piece is an opponent
              if (board[piece].player && board[piece].player !== 'black') {

                //if the piece is a Pawn
                if (board[piece] instanceof Pawn) {
                  // if the position to be moved to is a possible move of a Pawn,
                  if (allPossibleMoves[piece].includes(allPossibleMoves[square][move])) {
                    //if the file of the position to be moved to is not the same as the file of the pawn, can't move there
                    if (allPossibleMoves[square][move].file !== board[piece].file) {
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
                  if (allPossibleMoves[piece].includes(allPossibleMoves[square][move])) {
                    canMove = false;
                    break;
                  }
                }
              }
            }
            //if no opposing piece has possible moves for that position, the King can move there
            if (canMove) {
              ++blackMoveCount;
            }
          }
        }
      }
    }
    if (whiteMoveCount === 0 || blackMoveCount === 0) {
      console.log('Stalemate!');
      playerTurn = null;
    }
  }
  if (playerTurn) {
    console.log(`It's ${playerTurn}'s turn!`);
  }
}





function switchTurns() {
  if (playerTurn === 'white') {
    playerTurn = 'black';
  } else {
    playerTurn = 'white';
  }
}
