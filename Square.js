class Square {
  constructor(id, color, piece = '', player = '') {
    this.id = id,
    this.color = color,
    this.piece = piece.split(' ')[0],
    this.player = player,

    this.move = this.move.bind(this);


    this.div = $(`<div id=${this.id}
              class="square"
              style=min-width:62.5px;background-color:${this.color};>
                <div class="${this.player} ${piece}">
                </div>
              </div>`).click(this.move)


    return (
      this.div
    )
  }

  move(event) {

  if (activePiece === '') {
    if (this.player === turn) {
      activePiece = this;
      activePiece.div[0].classList.add('active');


      switch (this.piece) {
        case 'rook': {
          let squareCount = 1;
          while (CheckUpMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckDownMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckRightMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckLeftMove(squareCount, activePiece)) {
            ++squareCount;
          }
        } break;
        case 'knight': {
          CheckKnightMoves(activePiece);
        } break;
        case 'bishop': {
          let squareCount = 1;
          while (CheckDownLeftMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckDownRightMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckUpLeftMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckUpRightMove(squareCount, activePiece)) {
            ++squareCount;
          }
        } break;
        case 'queen': {
          let squareCount = 1;
          while (CheckDownLeftMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckDownRightMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckUpLeftMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckUpRightMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckUpMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckDownMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckRightMove(squareCount, activePiece)) {
            ++squareCount;
          }
          squareCount = 1;
          while (CheckLeftMove(squareCount, activePiece)) {
            ++squareCount;
          }
        } break;
        case 'king': {
          CheckDownLeftMove(1, activePiece);
          CheckDownRightMove(1, activePiece);
          CheckUpLeftMove(1, activePiece);
          CheckUpRightMove(1, activePiece);
          CheckUpMove(1, activePiece);
          CheckDownMove(1, activePiece);
          CheckRightMove(1, activePiece);
          CheckLeftMove(1, activePiece);
        } break;
        case 'pawn': {
          if (this.player === 'white') {

            if (CheckDownMove(1, activePiece)) {
              if (this.div.children()[0].classList[2] == 1) {
                CheckDownMove(2, activePiece);
              }
            }

            CheckDownRightMove(1, activePiece);

            CheckDownLeftMove(1, activePiece);

          } else if (this.player === 'black') {

            if (CheckUpMove(1, activePiece)) {
              if (this.div.children()[0].classList[2] == 1) {
                CheckUpMove(2, activePiece);
              }
            }

            CheckUpLeftMove(1, activePiece);

            CheckUpRightMove(1, activePiece);
          }
        }
      }
    }
  } else if (this === activePiece) {
    activePiece.div[0].classList.remove('active');
    activePiece = '';
    for(let moveIndex in possibleMoves) {
      $(`#${possibleMoves[moveIndex]}`).removeClass('available');
    }
    possibleMoves = [];
  } else if (this !== activePiece) {
    for(let moveIndex in possibleMoves) {
      if (event.currentTarget.id === possibleMoves[moveIndex]) {

        var piece = activePiece.piece;
        var player = activePiece.player;

        $(`#${event.currentTarget.id}`).children()[0].classList = ` ${player} ${piece.split(' ')[0]}`;
        this.piece = piece;
        this.player = player;

        activePiece.div[0].classList.remove('active');
        activePiece.div[0].children[0].classList = '';
        activePiece = '';
        for (let moveIndex in possibleMoves) {
          $(`#${possibleMoves[moveIndex]}`).removeClass('available');
        }
        possibleMoves = [];

        if (turn === 'white') {
          turn = 'black'
        } else {
          turn = 'white'
        }
        console.log(turn);
      }
    }
  }
}
}
