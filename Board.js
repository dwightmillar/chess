class Board {
  constructor() {
    this.squares = {};

    let piece = '';
    let player = '';
    let color = '';

    for (let fileIndex = 0; files[fileIndex]; fileIndex++) {

      color = 'black'
      if (fileIndex % 2) {
        color = 'white';
      }

      for (let rankIndex = 1; rankIndex <= 8; rankIndex++) {

        if (rankIndex - 1) {
          if (color === 'white') {
            color = 'black';
          } else {
            color = 'white'
          }
        }

        piece = '';

        if (rankIndex === 2) {
          piece = 'Pawn';
          player = 'white';
          switch (piece) {
            case 'Pawn': {
              piece = new Pawn(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Rook': {
              piece = new Rook(this.player);
            } break;
            case 'Knight': {
              piece = new Knight(this.player);
            } break;
            case 'Bishop': {
              piece = new Bishop(this.player);
            } break;
            case 'Queen': {
              piece = new Queen(this.player);
            } break;
            case 'King': {
              piece = new King(this.player);
            }
          }
          this.squares[`${files[fileIndex]}${rankIndex}`] = piece;
        } else if (rankIndex === 7) {
          piece = 'Pawn';
          player = 'black';
          switch (piece) {
            case 'Pawn': {
              piece = new Pawn(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Rook': {
              piece = new Rook(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Knight': {
              piece = new Knight(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Bishop': {
              piece = new Bishop(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Queen': {
              piece = new Queen(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'King': {
              piece = new King(files[fileIndex], rankIndex, piece, player, color);
            }
          }
          this.squares[`${files[fileIndex]}${rankIndex}`] = piece;
        }

          else if (rankIndex === 1) {
          piece = pieces[fileIndex];
          player = 'white';
          switch (piece) {
            case 'Pawn': {
              piece = new Pawn(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Rook': {
              piece = new Rook(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Knight': {
              piece = new Knight(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Bishop': {
              piece = new Bishop(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Queen': {
              piece = new Queen(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'King': {
              piece = new King(files[fileIndex], rankIndex, piece, player, color);
            }
          }
          this.squares[`${files[fileIndex]}${rankIndex}`] = piece;
        } else if (rankIndex === 8) {
          piece = pieces[fileIndex];
          player = 'black';
          switch (piece) {
            case 'Pawn': {
              piece = new Pawn(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Rook': {
              piece = new Rook(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Knight': {
              piece = new Knight(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Bishop': {
              piece = new Bishop(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'Queen': {
              piece = new Queen(files[fileIndex], rankIndex, piece, player, color);
            } break;
            case 'King': {
              piece = new King(files[fileIndex], rankIndex, piece, player, color);
            }
          }
          this.squares[`${files[fileIndex]}${rankIndex}`] = piece;
        } else {
          player = '';
          this.squares[`${files[fileIndex]}${rankIndex}`] = (new Square(files[fileIndex], rankIndex, player, color));
        }
      }
    }
    // console.log(this.squares);
    return this.squares;
  }
}
