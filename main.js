
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
    console.log(`It's ${playerTurn}'s turn!`);
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
          }
            break;
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
