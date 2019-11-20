class Square {
  constructor(id, color, piece = '', player = '') {
    this.id = id,
    this.color = color,
    this.piece = piece,
    this.player = player,
    this.hasMoved = false;

    this.move = this.move.bind(this);


    this.div = $(`<div id=${this.id}
              class="square"
              style=min-width:62.5px;background-color:${this.color};>
                <div class="${this.piece} ${this.player}">
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
      console.log(activePiece);
      activePiece.div[0].classList.add('active');
      const file = activePiece.id.split('')[0];
      const rank = parseInt(activePiece.id.split('')[1]);

      switch (this.piece) {
        case 'rook': {
          // let possibleMove = '';
          // let squareCount = 1;
          // console.log(document.getElementById(`${file}${rank + squareCount}`).children[0].classList);
          // while(possibleMove) {
          //   if (!document.getElementById(`${file}${rank + squareCount}`)) {
          //     if (document.getElementById(`${file}${rank + squareCount}`).children[0].classList) {
          //       possibleMove = `${rank + squareCount}`;
          //     }
          //   }
          //   if (!document.getElementById(`${file}${rank - squareCount}`)) {
          //     console.log()
          //     break;
          //   }
          //   if (!document.getElementById(`${columns[columns.findIndex(file) + squareCount]}${rank}`)) {
          //     console.log()
          //     break;
          //   }
          //   if (!document.getElementById(`${columns[columns.findIndex(file) - squareCount]}${rank}`)) {
          //     console.log()
          //     break;
          //   }
          //   squareCount++;
          // }
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
            if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + 1]}${rank}`).children[0].classList) {
              possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + 1]}${rank}`);
              $(`#${columns[columns.findIndex((element) => element === file) + 1]}${rank}`).addClass('available');

              if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + 2]}${rank}`).children[0].classList && this.hasMoved === false) {
                possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + 2]}${rank}`);
                $(`#${columns[columns.findIndex((element) => element === file) + 2]}${rank}`).addClass('available');

              }
            }

          } else if (this.player === 'black') {
            if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - 1]}${rank}`).children[0].classList) {
              possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - 1]}${rank}`);
              $(`#${columns[columns.findIndex((element) => element === file) - 1]}${rank}`).addClass('available');

              if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - 2]}${rank}`).children[0].classList && this.hasMoved === false) {
                possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - 2]}${rank}`);
                $(`#${columns[columns.findIndex((element) => element === file) - 2]}${rank}`).addClass('available');

              }
            }

          }
        }
      }
    }
  } else if (this === activePiece) {
    activePiece.div[0].classList.remove('active');
    activePiece = '';
    for(let id in possibleMoves) {
      $(`#${possibleMoves[id]}`).removeClass('available');
    }
    possibleMoves = [];
  } else if (this !== activePiece) {
    for(let id in possibleMoves) {
      if (event.currentTarget.id === possibleMoves[id]) {
        // var piece = $(`#${activePiece}`).children()[0].classList[0];
        // var color = $(`#${activePiece}`).children()[0].classList[1];
        var piece = activePiece.piece;
        var player = activePiece.player;


        $(`#${event.currentTarget.id}`).children()[0].classList = `${piece} ${player}`;
        this.piece = piece;
        this.player = player;

        activePiece.div[0].classList.remove('active');
        activePiece.div[0].children[0].remove();
        activePiece = '';
        for (let id in possibleMoves) {
          $(`#${possibleMoves[id]}`).removeClass('available');
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
