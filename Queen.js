class Queen extends Square {
  constructor(file, rank, piece, player, color) {
    super(file, rank, player, color);
    this.piece = $('<div>', {
      class: `${player} Queen`
    })

    this.div = this.div.append(this.piece);

    return this;
  }

  updatePossibleMoves() {
    $(this.piece).click(this.move);
    allPossibleMoves[this.id] = [];
    allPotentialMoves[this.id] = [];
    blockingPieces[this.id] = [];


    this.checkMove(0, 1);

    this.checkMove(0, -1);

    this.checkMove(-1, 0);

    this.checkMove(1, 0);

    this.checkMove(-1, -1);

    this.checkMove(-1, 1);

    this.checkMove(1, -1);

    this.checkMove(1, 1);

  }

  checkMove(horizontal, vertical) {

    let targetPlayer = '';
    let horizontalSquareCount = horizontal;
    let verticalSquareCount = vertical;
    let opponent = '';
    let checkPotentialMoves = false;
    let potentialBlockingPiece = null;

    if (this.player === 'white') {
      opponent = 'black';
    } else {
      opponent = 'white';
    }

    //if the player is not in check
    if (isInCheck !== this.player) {
      // while the position to be checked exists
      while (board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]) {

        targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`].player;

        if (checkPotentialMoves === false) {
          //if the square is not occupied by the same player
          if (targetPlayer !== this.player) {
            //make the square a valid move
            allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);
            //if the square is occupied by an opposing piece, stop checking
            if (targetPlayer) {
              blockingPieces[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);
              checkPotentialMoves = true;
            }
            //if the square is occupied by the same player, stop checking
          } else {
            allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);
            checkPotentialMoves = true;
          }
        } else {
          if (potentialBlockingPiece instanceof King) {
            blockingPieces[this.id].push(potentialBlockingPiece);
          }
          //if the square is not occupied by the same player
          if (targetPlayer !== this.player) {
            //make the square a valid move
            allPotentialMoves[this.id].push(`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`);
          }
          else {
            break;
          }
        }

        if (horizontalSquareCount < 0) {
          --horizontalSquareCount;
        } else if (horizontalSquareCount > 0) {
          ++horizontalSquareCount;
        }

        if (verticalSquareCount < 0) {
          --verticalSquareCount;
        } else if (verticalSquareCount > 0) {
          ++verticalSquareCount;
        }
      }
    } else {
      // while the position to be checked exists
      if (threateningPieces.length > 1) {
        return;
      }
      while (board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]) {
        
        targetPlayer = board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`].player;

        if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}` === threateningPieces[0]) {
          allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);
        } else if (targetPlayer) {

        }

        if (allPossibleMoves[threateningPieces[0]].includes(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`])) {
          switch(threateningPieces[0].constructor.name) {
            case 'Rook': {
              if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` === threateningPieces[0].file) {
                if (`${this.rank + verticalSquareCount}` > threateningPieces[0].rank && `${this.rank + verticalSquareCount}` < king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                } 
                else if (`${this.rank + verticalSquareCount}` < threateningPieces[0].rank && `${this.rank + verticalSquareCount}` > king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                }
              } 
              else if (`${this.rank + verticalSquareCount}` === threateningPieces[0].rank) {
                if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` > threateningPieces[0].file && `${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` < king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                } 
                else if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` < threateningPieces[0].file && `${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` > king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                }
              }
            } break;
            case 'Bishop': {
              if (`${this.rank + verticalSquareCount}` < threateningPieces[0].rank && `${this.rank + verticalSquareCount}` > king[0]) {
                if (`${this.rank + verticalSquareCount}` > threateningPieces[0].rank && `${this.rank + verticalSquareCount}` < king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                } 
                else if (`${this.rank + verticalSquareCount}` < threateningPieces[0].rank && `${this.rank + verticalSquareCount}` > king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                }
              } 
              else if (`${this.rank + verticalSquareCount}` > threateningPieces[0].rank && `${this.rank + verticalSquareCount}` < king[0]) {
                if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` > threateningPieces[0].file && `${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` < king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                } 
                else if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` < threateningPieces[0].file && `${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` > king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                }
              }

            } break;
            case 'Queen': {
              if (`${this.rank + verticalSquareCount}` < threateningPieces[0].rank && `${this.rank + verticalSquareCount}` > king[0]) {
                if (`${this.rank + verticalSquareCount}` > threateningPieces[0].rank && `${this.rank + verticalSquareCount}` < king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                } 
                else if (`${this.rank + verticalSquareCount}` < threateningPieces[0].rank && `${this.rank + verticalSquareCount}` > king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                }
              } 
              else if (`${this.rank + verticalSquareCount}` > threateningPieces[0].rank && `${this.rank + verticalSquareCount}` < king[0]) {
                if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` > threateningPieces[0].file && `${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` < king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                } 
                else if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` < threateningPieces[0].file && `${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` > king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                }
              } else if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` === threateningPieces[0].file) {
                if (`${this.rank + verticalSquareCount}` > threateningPieces[0].rank && `${this.rank + verticalSquareCount}` < king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                } 
                else if (`${this.rank + verticalSquareCount}` < threateningPieces[0].rank && `${this.rank + verticalSquareCount}` > king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                }
              } 
              else if (`${this.rank + verticalSquareCount}` === threateningPieces[0].rank) {
                if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` > threateningPieces[0].file && `${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` < king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                } 
                else if (`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` < threateningPieces[0].file && `${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}` > king[1]) {
                  allPossibleMoves[this.id].push(board[`${files[files.findIndex((element) => element === this.file) + horizontalSquareCount]}${this.rank + verticalSquareCount}`]);

                }
              }
            } break;
          }
        }

        if (horizontalSquareCount < 0) {
          --horizontalSquareCount;
        } else if (horizontalSquareCount > 0) {
          ++horizontalSquareCount;
        }

        if (verticalSquareCount < 0) {
          --verticalSquareCount;
        } else if (verticalSquareCount > 0) {
          ++verticalSquareCount;
        }
      }
    }
  }
}
