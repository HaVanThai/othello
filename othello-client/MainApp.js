class MainApp {

  constructor(){}

  start() {
    const host = 'http://localhost:8080';
    let game = new Game(
      BOARD_MATRIX_INIT.slice(), 
      new Player("Player 1", 1, 0, 0, 2), 
      new Player("Player 2", 2, 0, 0, 2), 
      '', 
      0
    );

    let gameManager = new GameManager(game);
    let playerManager = new PlayerManager();

    let socketManager = new SocketManager(host);

    let gameRender = new GameRender(game, socketManager, gameManager, playerManager);
    let socketHandler = new SocketHandler(game, gameRender);

    socketManager.socketHandler = socketHandler;
    socketManager.initSocket();
    gameRender.initView();
  }

}