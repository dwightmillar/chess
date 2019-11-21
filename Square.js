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
          null;
        } break;
        case 'bishop': {
          null;
        } break;
        case 'queen': {
          null;
        } break;
        case 'king': {
          null;
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

function CheckLeftMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);
  let opponent = '';
  if (activePiece.player === 'white') {
    opponent = 'black';
  } else {
    opponent = 'white';
  }

  if (document.getElementById(`${columns[columns.findIndex((element) => element === file)]}${rank - spaces}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file)]}${rank - spaces}`).children[0].classList[0] === activePiece.player) {
      return false;
    } else if (document.getElementById(`${columns[columns.findIndex((element) => element === file)]}${rank - spaces}`).children[0].classList[0] === opponent) {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file)]}${rank - spaces}`);
      $(`#${columns[columns.findIndex((element) => element === file)]}${rank - spaces}`).addClass('available');
      return false;
    } else {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file)]}${rank - spaces}`);
      $(`#${columns[columns.findIndex((element) => element === file)]}${rank - spaces}`).addClass('available');
      return true;
    }
  }
}

function CheckRightMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);
  let opponent = '';
  if (activePiece.player === 'white') {
    opponent = 'black';
  } else {
    opponent = 'white';
  }

  if (document.getElementById(`${columns[columns.findIndex((element) => element === file)]}${rank + spaces}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file)]}${rank + spaces}`).children[0].classList[0] === activePiece.player) {
      return false;
    } else if (document.getElementById(`${columns[columns.findIndex((element) => element === file)]}${rank + spaces}`).children[0].classList[0] === opponent) {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file)]}${rank + spaces}`);
      $(`#${columns[columns.findIndex((element) => element === file)]}${rank + spaces}`).addClass('available');
      return false;
    } else {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file)]}${rank + spaces}`);
      $(`#${columns[columns.findIndex((element) => element === file)]}${rank + spaces}`).addClass('available');
      return true;
    }
  }
}

function CheckUpMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);
  let opponent = '';
  if (activePiece.player === 'white') {
    opponent = 'black';
  } else {
    opponent = 'white';
  }

  if (activePiece.piece === 'pawn') {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`).children[0].classList.length === 0) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`);
        $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`).addClass('available');
        return true;
      }
    }
  } else {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`).children[0].classList[0] === activePiece.player) {
        return false;
      } else if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`).children[0].classList[0] === opponent) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`);
        $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`).addClass('available');
        return false;
      } else {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`);
        $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank}`).addClass('available');
        return true;
      }
    }
  }
}

function CheckDownMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);
  let opponent = '';
  if (activePiece.player === 'white') {
    opponent = 'black';
  } else {
    opponent = 'white';
  }

  if (activePiece.piece === 'pawn') {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`).children[0].classList.length === 0) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`);
        $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`).addClass('available');
        return true;
      }
    }
  } else {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`).children[0].classList[0] === activePiece.player) {
        return false;
      } else if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`).children[0].classList[0] === opponent) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`);
        $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`).addClass('available');
        return false;
      } else {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`);
        $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank}`).addClass('available');
        return true;
      }
    }
  }
}

function CheckDownRightMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);

  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`).children[0].classList[0] === 'black') {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`);
      $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`).addClass('available');
    }
  }
}

function CheckDownLeftMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);

  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`).children[0].classList[0] === 'black') {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`);
      $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`).addClass('available');
    }
  }
}

function CheckUpRightMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);

  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`).children[0].classList[0] === 'white') {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`);
      $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`).addClass('available');
    }
  }
}

function CheckUpLeftMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);

  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`).children[0].classList[0] === 'white') {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`);
      $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`).addClass('available');
    }
  }
}
