
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
    console.log('entered conditional');
    $(".row").css("max-height", squareHeight);
    $(".square").css("max-width", squareWidth);
    return;
  }
  for(let rowCount = 1; rowCount <= 8; rowCount++) {
    let row = $(`<div id=${columns[rowCount - 1]} class=row style=min-height:62.5px;max-height:${squareHeight}px;></div>`)
    main.append(row);
    for(let squareCount = 1; squareCount <= 8; squareCount++) {
      row.append(`<div class=square style=min-width:62.5px;max-width:${squareWidth}px;></div>`)
    }
  }
}
