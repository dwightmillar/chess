class Square {
  constructor(file, rank, piece, player, color) {
    this.id = `${file}${rank}`,
    this.piece = piece,
    this.player = player,
    this.color = color

    this.move = this.move.bind(this);

    this.space = $('<div>', {
                  id: this.id,
                  class: `square`,
                  style: `background-color: ${this.color};`
                  });

    this.piece = $('<div>', {
                  class: `${this.player} ${this.piece}`
                  }).click(this.move);

    this.div = this.space.append(this.piece);


    return this.div[0]
  }

  move(event) {
    if (!activePiece) {
      activePiece = this;
      console.log(board[activePiece.id]);
      board[activePiece.id].style = 'background-color: cyan;';
      console.log(board);
      console.log(activePiece);
    } else if (activePiece === this) {
      board[activePiece.id].style = `background-color: ${this.color};`;

      activePiece = '';
      console.log(activePiece);

    }
  }
}
