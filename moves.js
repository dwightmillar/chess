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
  let opponent = '';
  if (activePiece.player === 'white') {
    opponent = 'black';
  } else {
    opponent = 'white';
  }

  if (activePiece.piece === 'pawn') {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`).children[0].classList[0] === opponent) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`).addClass('available');
        return false;
      }
    }
  } else {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`).children[0].classList[0] === activePiece.player) {
        return false;
      } else if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`).children[0].classList[0] === opponent) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`).addClass('available');
        return false;
      } else {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank + spaces}`).addClass('available');
        return true;
      }
    }
  }
}


function CheckDownLeftMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);
  let opponent = '';
  if (activePiece.player === 'white') {
    opponent = 'black';
  } else {
    opponent = 'white';
  }

  if (activePiece.piece === 'pawn') {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`).children[0].classList[0] === opponent) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`).addClass('available');
        return false;
      }
    }
  } else {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`).children[0].classList[0] === activePiece.player) {
        return false;
      } else if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`).children[0].classList[0] === opponent) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`).addClass('available');
        return false;
      } else {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) + spaces]}${rank - spaces}`).addClass('available');
        return true;
      }
    }
  }
}

function CheckUpRightMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);
  let opponent = '';
  if (activePiece.player === 'white') {
    opponent = 'black';
  } else {
    opponent = 'white';
  }

  if (activePiece.piece === 'pawn') {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`).children[0].classList[0] === opponent) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`).addClass('available');
        return false;
      }
    }
  } else {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`).children[0].classList[0] === activePiece.player) {
        return false;
      } else if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`).children[0].classList[0] === opponent) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`).addClass('available');
        return false;
      } else {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank + spaces}`).addClass('available');
        return true;
      }
    }
  }
}

function CheckUpLeftMove(spaces, activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);
  let opponent = '';
  if (activePiece.player === 'white') {
    opponent = 'black';
  } else {
    opponent = 'white';
  }

  if (activePiece.piece === 'pawn') {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`).children[0].classList[0] === opponent) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`).addClass('available');
        return false;
      }
    }
  } else {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`)) {
      if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`).children[0].classList[0] === activePiece.player) {
        return false;
      } else if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`).children[0].classList[0] === opponent) {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`).addClass('available');
        return false;
      } else {
        possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`);
        $(`#${columns[columns.findIndex((element) => element === file) - spaces]}${rank - spaces}`).addClass('available');
        return true;
      }
    }
  }
}

function CheckKnightMoves(activePiece) {
  const file = activePiece.id.split('')[0];
  const rank = parseInt(activePiece.id.split('')[1]);
  let opponent = '';
  if (activePiece.player === 'white') {
    opponent = 'black';
  } else {
    opponent = 'white';
  }


  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - 2]}${rank - 1}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - 2]}${rank - 1}`).children[0].classList[0] !== activePiece.player) {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - 2]}${rank - 1}`);
      $(`#${columns[columns.findIndex((element) => element === file) - 2]}${rank - 1}`).addClass('available');
    }
  }
  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - 2]}${rank + 1}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - 2]}${rank + 1}`).children[0].classList[0] !== activePiece.player) {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - 2]}${rank + 1}`);
      $(`#${columns[columns.findIndex((element) => element === file) - 2]}${rank + 1}`).addClass('available');
    }
  }
  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + 2]}${rank + 1}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + 2]}${rank + 1}`).children[0].classList[0] !== activePiece.player) {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + 2]}${rank + 1}`);
      $(`#${columns[columns.findIndex((element) => element === file) + 2]}${rank + 1}`).addClass('available');
    }
  }
  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + 2]}${rank - 1}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + 2]}${rank - 1}`).children[0].classList[0] !== activePiece.player) {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + 2]}${rank - 1}`);
      $(`#${columns[columns.findIndex((element) => element === file) + 2]}${rank - 1}`).addClass('available');
    }
  }
  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - 1]}${rank - 2}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - 1]}${rank - 2}`).children[0].classList[0] !== activePiece.player) {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - 1]}${rank - 2}`);
      $(`#${columns[columns.findIndex((element) => element === file) - 1]}${rank - 2}`).addClass('available');
    }
  }
  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - 1]}${rank + 2}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) - 1]}${rank + 2}`).children[0].classList[0] !== activePiece.player) {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) - 1]}${rank + 2}`);
      $(`#${columns[columns.findIndex((element) => element === file) - 1]}${rank + 2}`).addClass('available');
    }
  }
  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + 1]}${rank + 2}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + 1]}${rank + 2}`).children[0].classList[0] !== activePiece.player) {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + 1]}${rank + 2}`);
      $(`#${columns[columns.findIndex((element) => element === file) + 1]}${rank + 2}`).addClass('available');
    }
  }
  if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + 1]}${rank - 2}`)) {
    if (document.getElementById(`${columns[columns.findIndex((element) => element === file) + 1]}${rank - 2}`).children[0].classList[0] !== activePiece.player) {
      possibleMoves.push(`${columns[columns.findIndex((element) => element === file) + 1]}${rank - 2}`);
      $(`#${columns[columns.findIndex((element) => element === file) + 1]}${rank - 2}`).addClass('available');
    }
  }
}
