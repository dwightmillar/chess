
var windowHeight;
var windowWidth;
var squareWidth;
var squareHeight;


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
  const columns = ['a','b','c','d','e','f','g','h'];

  if(main.children().length) {
    $(".row").css("max-height", squareHeight, "width", (squareHeight * 8) + 12);
    $(".square").css("max-width", squareWidth);
    return;
  }
  for(let rowCount = 1; rowCount <= 8; rowCount++) {

    let row = $(`<div class=row style=min-height:62.5px;max-height:${squareHeight}px;width:${(squareHeight * 8) + 12}px></div>`)
    main.append(row);
    for(let squareCount = 1; squareCount <= 8; squareCount++) {
      console.log(squareCount);
      var color;

      if (rowCount % 2 === 1 && squareCount % 2 === 0) {
        color = 'black';
      } else if (rowCount % 2 === 1 && squareCount % 2 === 1) {
        color = 'white';
      } else if (rowCount % 2 === 0 && squareCount % 2 === 0) {
        color = 'white';
      } else if (rowCount % 2 === 0 && squareCount % 2 === 1) {
        color = 'black';
      }
      row.append(new Square(`${columns[rowCount - 1]}` + `${squareCount}`, color));
    }
  }
}

class Square {
  constructor(id, color, piece='', player='') {
    this.id = id,
    this.color = color,
    this.piece = piece,
    this.player = player

    return(
      $(`<div id=${this.id} class="square ${this.color}${this.piece}${this.player}" style=min-width:62.5px;></div>`)
    )
  }
}
