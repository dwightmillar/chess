
  let rank = '';
  let allPossibleMoves = {};
  let activePiece = '';
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const pieces = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook'];
  let playerTurn = 'white';
  let isInCheck = '';
  let threateningPiece = '';


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
