class SocketManager {

  constructor(host) {
    this.host = host;
    this.socket = null;
    this.socketHandler = null;
  }

  initSocket() {
    // we declare new variable because in socket.io callback, 'this' is an instance of socket, not this class.
    let socketHandler = this.socketHandler;
    this.socket = io.connect(this.host);
    this.socket.on('init_room', function(room){
      socketHandler.initRoomHandler(room);
    });
    this.socket.on('joined_room', function(room){
      socketHandler.joinedRoomHandler(room);
    });
    this.socket.on('new_move', function(data){
      socketHandler.newMoveHandler(data);
    });
    this.socket.on('opponent_joined', function(opponentName){
      socketHandler.opponentJoinedHandler(opponentName);
    });
  }

  emitNewMove(game){
    this.socket.emit('on_move', new DataTransfer(game.boardMatrix, game.lastTurnPlayer));
  }

  emitJoinRoomRequest(room) {
    this.socket.emit('join_room', room);
  }

}