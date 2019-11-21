window.onload = loadBoard();

function loadBoard() {
  const Board = new Board();

  $('main').append(Board);
}
