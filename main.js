// window.onload = loadBoard();

// function loadBoard() {
  const newBoard = new Board();
  let rank = '';

  for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
    rank = $("<div/>", { class: 'file' })
    for (let squareIndex = 0; squareIndex < 8; squareIndex++) {
      console.log(newBoard);
      rank.append(newBoard.shift());
    }
    $('main').append(rank);
  }
// }
