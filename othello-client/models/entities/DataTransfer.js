class DataTransfer {
  constructor (boardMatrix, lastTurnPlayer) {
    this.boardMatrix = boardMatrix;
    this.lastTurnPlayer = lastTurnPlayer;
  }

  initDataTransfer() {
    this.boardMatrix = board_matrix_init.slice(),
    this.lastTurnPlayer = 2
  }

}