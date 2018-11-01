class GameManager {
  constructor(game) {
    this.game = game;
  }

  resetGame(){
    this.resetBoardMatrix();
    this.game.lastTurnPlayer = 2;
    this.game.you.score = 2;
    this.game.opponent.score = 2;
  }

  resetBoardMatrix() {
    this.game.boardMatrix = BOARD_MATRIX_INIT.slice();
  }

  changeLastTurnPlayer(){
    this.game.lastTurnPlayer = (this.game.lastTurnPlayer == 1) ? 2 : 1;
  }

  calcScore() {
    let score = {
      1: 0,
      2: 0
    };
    const boardSize = this.game.boardMatrix.length;
    for(let i=0; i<boardSize; i++) {
      for(let j=0; j<boardSize; j++) {
        if(this.game.boardMatrix[j][i] != 0) {
          score[this.game.boardMatrix[j][i]]++;
        }
      }
    }
    return score;
  }

  // Update matrix for each new move
  updateGameBoardAfterNewMove(x, y, playerChess) {
    this.game.boardMatrix[x][y] = playerChess;
    // Top
    this.updateGameBoardAfterNewMoveByDirection(x, y, 0, -1);
    // Top-Right
    this.updateGameBoardAfterNewMoveByDirection(x, y, 1, -1);
    // Right
    this.updateGameBoardAfterNewMoveByDirection(x, y, 1, 0);
    // Bottom-Right
    this.updateGameBoardAfterNewMoveByDirection(x, y, 1, 1);
    // Bottom
    this.updateGameBoardAfterNewMoveByDirection(x, y, 0, 1);
    // Bottom-Left
    this.updateGameBoardAfterNewMoveByDirection(x, y, -1, 1);
    // Left
    this.updateGameBoardAfterNewMoveByDirection(x, y, -1, 0);
    // Top-Left
    this.updateGameBoardAfterNewMoveByDirection(x, y, -1, -1);
  }

  updateGameBoardAfterNewMoveByDirection(x, y, xGap, yGap) {
    const board_size = this.game.boardMatrix.length;
    let xTemp = x + xGap;
    let yTemp = y + yGap;
    if (xTemp >= 0 && xTemp < board_size &&
      yTemp >= 0 && yTemp < board_size &&
      this.game.boardMatrix[xTemp][yTemp] != 0 &&
      this.game.boardMatrix[xTemp][yTemp] != this.game.boardMatrix[x][y]) {

      while (xTemp + xGap >= 0 && xTemp + xGap < board_size &&
        yTemp + yGap >= 0 && yTemp + yGap < board_size) {
        xTemp = xTemp + xGap;
        yTemp = yTemp + yGap;
        if (this.game.boardMatrix[xTemp][yTemp] == this.game.boardMatrix[x + xGap][y + yGap]) {
          continue;
        } else if (this.game.boardMatrix[xTemp][yTemp] == 0) {
          break;
        } else {
          while (xTemp != x || yTemp != y) {
            this.game.boardMatrix[xTemp][yTemp] = this.game.boardMatrix[x][y];
            xTemp = xTemp - xGap;
            yTemp = yTemp - yGap;
          }
          break;
        }
      }
    }
  }

  listAllPossibleMove(playerChess) {
    let possibleMoves = [];
    let possibleMove = null;
    const board_size = this.game.boardMatrix.length;
    for (let i = 0; i < board_size; i++) {
      for (let j = 0; j < board_size; j++) {
        if (this.game.boardMatrix[j][i] == playerChess) {
          // Top
          possibleMove = this.checkPossibleMove(this.game.boardMatrix, j, i, 0, -1);
          if (possibleMove != null) possibleMoves.push(possibleMove);
          // Top-Right
          possibleMove = this.checkPossibleMove(this.game.boardMatrix, j, i, 1, -1);
          if (possibleMove != null) possibleMoves.push(possibleMove);
          // Right
          possibleMove = this.checkPossibleMove(this.game.boardMatrix, j, i, 1, 0);
          if (possibleMove != null) possibleMoves.push(possibleMove);
          // Bottom-Right
          possibleMove = this.checkPossibleMove(this.game.boardMatrix, j, i, 1, 1);
          if (possibleMove != null) possibleMoves.push(possibleMove);
          // Bottom
          possibleMove = this.checkPossibleMove(this.game.boardMatrix, j, i, 0, 1);
          if (possibleMove != null) possibleMoves.push(possibleMove);
          // Bottom-Left
          possibleMove = this.checkPossibleMove(this.game.boardMatrix, j, i, -1, 1);
          if (possibleMove != null) possibleMoves.push(possibleMove);
          // Left
          possibleMove = this.checkPossibleMove(this.game.boardMatrix, j, i, -1, 0);
          if (possibleMove != null) possibleMoves.push(possibleMove);
          // Top-Left
          possibleMove = this.checkPossibleMove(this.game.boardMatrix, j, i, -1, -1);
          if (possibleMove != null) possibleMoves.push(possibleMove);
        }
      }
    }
    return possibleMoves;
  }

  checkPossibleMove(boardMatrix, x, y, xGap, yGap) {
    let possibleMove = null;
    const board_size = boardMatrix.length;
    let xTemp = x + xGap;
    let yTemp = y + yGap;
    if (xTemp >= 0 && xTemp < board_size &&
      yTemp >= 0 && yTemp < board_size &&
      boardMatrix[xTemp][yTemp] != 0 &&
      boardMatrix[xTemp][yTemp] != boardMatrix[x][y]) {
      while (xTemp + xGap >= 0 && xTemp + xGap < board_size &&
        yTemp + yGap >= 0 && yTemp + yGap < board_size) {
        xTemp = xTemp + xGap;
        yTemp = yTemp + yGap;

        if (boardMatrix[xTemp][yTemp] == boardMatrix[x + xGap][y + yGap]) {
          continue;
        } else if (boardMatrix[xTemp][yTemp] == 0) {
          possibleMove = { x: xTemp, y: yTemp };
          break;
        } else {
          break;
        }
      }
    }
    return possibleMove;
  }
}