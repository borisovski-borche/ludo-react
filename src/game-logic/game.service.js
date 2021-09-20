import { PlayerToken } from "./Models/PlayerToken.model";
import { Player } from "./Models/Player.model";

//logic for generation all the tokens in p
const playerData = [
  { startingPosition: 30, color: "yellow" },
  { startingPosition: 0, color: "green" },
  { startingPosition: 10, color: "red" },
  { startingPosition: 20, color: "blue" },
];

const colors = ["yellow", "green", "red", "blue"];

export const players = playerData.map(
  playerObj =>
    new Player(
      playerObj.color,
      colors.map((_, i) => new PlayerToken(playerObj.color, i + 1)),
      playerObj.startingPosition
    )
);
//Math formula for the dice roll
export const generateDiceRoll = () => {
  return Math.random() * 6 + 1;
};
//calculating old positon
const calcOldPositon = (oldBoard, token) => {
  return oldBoard.findIndex(boardToken => boardToken?.id === token.id);
};

//logic for manipulating the rendered board
export const changeTokenPositionRender = (oldBoard, token, diceRoll) => {
  const oldPosition = calcOldPositon(oldBoard, token);

  token.changePosition(diceRoll);

  const position = oldPosition + diceRoll > 39 ? oldPosition - 40 : oldPosition;

  const targetPositionToken = oldBoard[position + diceRoll];

  const newBoard = [...oldBoard];
  if (targetPositionToken) {
    if (targetPositionToken.playerColor === token.playerColor) {
      return oldBoard;
    }
    targetPositionToken.resetPositon();
    newBoard[position] = undefined;
    newBoard[position + diceRoll] = token;
    return newBoard;
  } else {
    newBoard[oldPosition] = undefined;
    newBoard[position + diceRoll] = token;
    return newBoard;
  }
};

export const initialiseTokenRender = (oldBoard, player, token, diceRoll) => {
  if (diceRoll !== 6) {
    return oldBoard;
  }
  if (oldBoard[player.startingPosition]) {
    if (oldBoard[player.startingPosition].playerColor === player.color) {
      return oldBoard;
    } else {
      oldBoard[player.startingPosition].resetPositon();
    }
  }

  const newBoard = [...oldBoard];
  token.startPlay();
  newBoard[player.startingPosition] = token;
  return newBoard;
};

export const parkTokenRender = (oldBoard, token, oldPosition, diceRoll) => {
  if (token.position + diceRoll > 43) {
    return oldBoard;
  }

  const newBoard = [...oldBoard];

  token.parkToken(token.position + diceRoll - 40);
  token.changePosition(diceRoll);

  newBoard[oldPosition] = undefined;
  return newBoard;
};
