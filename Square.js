class Square {
  constructor(file, rank, piece, player, color) {
    this.space = $('<div>', {
                  id: `${file}${rank}`,
                  class: `square`,
                  style: `background-color: ${color};`
                  });

    this.piece = $('<div>', {
                  class: `${player} ${piece}`
                  })

    this.div = this.space.append(this.piece);

    return this.div
  }
}
