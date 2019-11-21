
var windowHeight;
var windowWidth;
var squareWidth;
var squareHeight;

var turn = 'white';
var activePiece = '';
var targetSquares = [];
var possibleMoves = [];

const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];


$(document).ready(function(){
  calculateWindowDimensions();
  loadBoard();
  $(window).resize(function(){
    calculateWindowDimensions();
    loadBoard();
  })
})


function calculateWindowDimensions() {
  windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

  windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  squareWidth = windowWidth / 8;
  squareHeight = (windowHeight * 0.8) / 8;

  if (squareWidth > squareHeight) {
    squareWidth = squareHeight;
  } else {
    squareHeight = squareWidth;
  }
}


function loadBoard() {
  const main = $("main");
  var piece;
  var color;
  var player;

  if(main.children().length) {
    $(".row").css("max-height", squareHeight, "width", (squareHeight * 8) + 12);
    $(".square").css("max-width", squareWidth);
    return;
  }
  for(let rowCount = 1; rowCount <= 8; rowCount++) {

    let row = $(`<div class=row style=min-height:62.5px;max-height:${squareHeight}px;width:${(squareHeight * 8) + 12}px></div>`)
    main.append(row);
    for(let squareCount = 1; squareCount <= 8; squareCount++) {
      player = '';
      piece = '';

      if (rowCount % 2 === 1 && squareCount % 2 === 0) {
        color = 'white';
      } else if (rowCount % 2 === 1 && squareCount % 2 === 1) {
        color = 'black';
      } else if (rowCount % 2 === 0 && squareCount % 2 === 0) {
        color = 'black';
      } else if (rowCount % 2 === 0 && squareCount % 2 === 1) {
        color = 'white';
      }

      if (rowCount === 2 || rowCount === 7) {
        piece = 'pawn 1';
      } else if (rowCount === 1 || rowCount === 8) {
        piece = pieces[squareCount - 1];
      }

      if (rowCount === 1 || rowCount === 2) {
        player = 'white';
      } else if (rowCount === 7 || rowCount === 8) {
        player = 'black';
      }
      row.append(new Square(`${columns[rowCount - 1]}` + `${squareCount}`, color, piece, player));
    }
  }
}
