var OTHER_PLAYERS = {};
var UUID;

sockjs = null;

gameArea = {};
myGamePiece = null;
playerName = '';

otherPlayers: {};

constructor() {
var sockjs_url = 'localhost/echo/';

this.sockjs = newSockJs(sockjs_url);

this.initGameArea();
}

ngonInit() {
  this.getPlayerNmaeToStartGame();

  const that = this;

  this.sockjs.onopen = function () {};

  this.sockjs.onmessage = function(e) {
    Object.values(JSON.parse(e.data)).map(p => {
      //Update my player from server
      if(p.uuid == that.myGamePiece.uuid) {
      that.myGamePiece.health = p.health
      } else {
        // Update other players from server
        that.otherPlayers[p.uuid] = new GameComponent({
          ...p,
          gameArea: that.gameArea
        })
      }
    })

    OTHER_PLAYERS = that.otherPlayers;
  }
  
  this.sockjs.onclose = function() {}
}
