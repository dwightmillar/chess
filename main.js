
  let rank = '';
  let allPossibleMoves = {};
  let activePiece = '';
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const pieces = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook'];
  let playerTurn = 'white';


  let board = new Board();

  window.onload = loadBoard(board);

  function loadBoard(boardData) {

    let squares = [];

    $('.file').remove();

    for (let squareIndex in boardData) {
      let Square = boardData[squareIndex];
      squares.push(Square);
      if (!Square.updatePossibleMoves) {
        continue;
      }
      Square.updatePossibleMoves();
    }
    // console.log(squares);
    // console.log(allPossibleMoves);
    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      rank = $("<div/>", { class: 'file' })
      for (let squareIndex = 0; squareIndex < 8; squareIndex++) {
        rank.append(squares[(rankIndex * 8) + squareIndex].div);
      }
      $('main').append(rank);
    }
  }
