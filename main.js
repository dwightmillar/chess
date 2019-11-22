
  let board = new Board();
  let rank = '';
  let possibleMoves = [];
  let activePiece = '';

  let squares = [];
  for (let squareIndex in board) {
    squares.push(board[squareIndex]);
  }

  for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
    rank = $("<div/>", { class: 'file' })
    for (let squareIndex = 0; squareIndex < 8; squareIndex++) {
      rank.append(squares[(rankIndex * 8) + squareIndex]);
    }
    $('main').append(rank);
  }
