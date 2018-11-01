class PlayerManager {
  constructor(){
  }

  setScore(player, scoreObj) {
    player.score = scoreObj[player.chess];
  }
  
  incrementWon(player) {
    player.won++;
  }
  
  incrementLost(player) {
    player.lost++;
  }
}