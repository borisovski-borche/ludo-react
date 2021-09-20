export class PlayerToken {
  id;
  position = 0;
  parkPosition = null;
  playerColor;
  tokenNumber;
  inPlay = false;
  inHomeBase = false;

  constructor(playerColor, tokenNumber) {
    this.playerColor = playerColor;
    this.tokenNumber = tokenNumber;
    this.id = `${playerColor}-${tokenNumber}`;
  }

  changePosition(newPosition) {
    this.position += newPosition;
  }

  resetPositon() {
    this.position = 0;
    this.inPlay = false;
  }

  startPlay() {
    console.log("start play");
    this.inPlay = true;
  }

  parkToken(parkPosition) {
    this.parkPosition = parkPosition;
    this.inHomeBase = true;
  }
}
