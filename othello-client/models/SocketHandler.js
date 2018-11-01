class SocketHandler {

  constructor(game, gameRender){
    this.game = game;
    this.gameRender = gameRender;
  }

  // Handling after a new room was created
  initRoomHandler(room) {
    this.game.room = room;
    $('#room-number').text(room);

    // Init a player(you)
    let you = new Player("You", 1, 0, 0, 2);
    this.game.you = you;

    console.log('My room is ' + room);
  }
  
  // Handling after connected to a friend's room
  joinedRoomHandler(room) {
    if(room != '-1') {
      this.game.room = room;
      this.game.you.chess = 2;
      this.game.lastTurnPlayer = 2;
      $('#room-number').text(room);
      this.gameRender.resetGameBoard();
      console.log('You joined to room ' + room);
    } else {
      alert("Your friend's room doesn't exist!");
    }
  }
  
  // Update game_board after the opponent play a new move
  newMoveHandler(data) {
    const dataTransfer = Object.assign({}, data);
    this.game.boardMatrix = dataTransfer.boardMatrix;
    this.game.lastTurnPlayer = dataTransfer.lastTurnPlayer;
    this.gameRender.drawGame();
    this.gameRender.setOnclickListenerForPossibleMove();
  }

  // Handling after a friend joined the room
  opponentJoinedHandler(opponentName) {
    // Init a player(opponent)
    let opponent = new Player(opponentName, 2, 0, 0, 2);
    this.game.setOpponent(opponent);
  }
}