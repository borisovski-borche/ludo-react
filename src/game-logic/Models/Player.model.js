export class Player {
  color;
  tokens;
  startingPosition;

  constructor(color, tokens, startingPosition) {
    this.color = color;
    this.tokens = tokens;
    this.startingPosition = startingPosition;
  }
}
