class GameRender {
  constructor(game, socketController, gameManager, playerManager) {
    this.game = game;
    this.socketController = socketController;
    this.gameManager = gameManager;
    this.playerManager = playerManager;
  }

  initView() {
    this.resetGameBoard();
    this.initEvent();
  }

  drawGame() {
    this.drawGameBoard();
    this.showGameScore();
  }

  drawGameBoard() {
    let boardHtml = [];
    const boardSize = this.game.boardMatrix.length;
    boardHtml.push('<table>');
    for (let i = 0; i < boardSize; i++) {
      boardHtml.push("<tr>");
      for (let j = 0; j < boardSize; j++) {
        boardHtml.push('<td class ="cell ');
        // Push class 'empty', 'white' or 'black'
        boardHtml.push(CHESS[this.game.boardMatrix[j][i]] + '" ');
        boardHtml.push('id="cell_' + j + '_' + i + '">');
        boardHtml.push('<span class="disc"></span>');
        boardHtml.push('</td>');
      }
      boardHtml.push("</tr>");
    }
    boardHtml.push("</table>");
    $('#game-board').html(boardHtml.join(''));
  }

  showGameScore() {
    let score = this.gameManager.calcScore(this.game.boardMatrix);
    this.playerManager.setScore(this.game.you, score);
    this.playerManager.setScore(this.game.opponent, score);
    $('#your-score').text(this.game.you.score);
    $('#opponent-score').text(this.game.opponent.score);
  }

  initEvent() {
    this.setOnClickListenerForButtonJoinRoom();
  }

  // Set onClick event for all possible move of a player
  setOnclickListenerForPossibleMove() {
    // If it is not your turn, you can't play any move
    if(this.game.lastTurnPlayer == this.game.you.chess) {
      return;
    }
    const nextPlayerTurn = this.game.lastTurnPlayer == 1 ? 2 : 1;
    let allPossibleMoves = this.gameManager.listAllPossibleMove(nextPlayerTurn);
    // If player can't play any move, We skip and switch to opponent turn
    if (allPossibleMoves.length == 0) {

    } else {
      // we declare this because 'this' in click function is object of html
      let self = this;
      let game = this.game;
      let gameManager = this.gameManager;
      let socketController = this.socketController

      allPossibleMoves.forEach(possibleMove => {
        $('#cell_'+possibleMove.x+'_'+possibleMove.y)
          .addClass(CHESS[nextPlayerTurn]+'-possible-move')
          .click(function(){
            // Update board_matrix
            gameManager.updateGameBoardAfterNewMove(possibleMove.x, possibleMove.y, nextPlayerTurn);
            
            // Clear game_board and draw again
            $('#game-board').html('');
            self.drawGame();
            gameManager.changeLastTurnPlayer();
    
            // Set onClick event for all possible move of a player again
            self.setOnclickListenerForPossibleMove();

            // Emit to server that a player just play a new move
            socketController.emitNewMove(game);
          });
      });
    }
  }

  resetGameBoard() {
    $('#game-board').html('');
    this.gameManager.resetGame();
    this.drawGame();
    this.setOnclickListenerForPossibleMove();
  }

  setOnClickListenerForButtonJoinRoom(){
    // we declare this because 'this' in click function is object html
    let socketController = this.socketController;
    $('#btn-join').click(function () {
      const room = $('#friend-room-number').val();
      $('#friend-room-number').val('');
      socketController.emitJoinRoomRequest(room);
    });
  }
}