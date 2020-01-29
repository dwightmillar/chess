
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

  function loadBoard(boardData) {

    let squares = [];

    $('.file').remove();

    for (let squareIndex in boardData) {
      let Square = boardData[squareIndex];
      squares.push(Square);
      if (!Square.updatePossibleMoves || Square instanceof King) {
        continue;
      }
      Square.updatePossibleMoves();
    }

    for (let squareIndex in boardData) {
      let Square = boardData[squareIndex];
      if (!Square.updatePossibleMoves) {
        continue;
      }
      if (Square instanceof King) {
        Square.updatePossibleMoves();
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
      });
    }
  }
}

function checkForCheck() {
  let checkMessage = null;
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
