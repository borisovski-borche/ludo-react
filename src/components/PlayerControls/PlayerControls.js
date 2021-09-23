import { useState, useEffect } from "react";
import classes from "./PlayerControls.module.scss";
import { generateDiceRoll } from "../../game-logic/game.service";

const PlayerControls = props => {
  const { player, currentPlayer, style, onDiceRoll, onPassTurn } = props;

  const [diceRoll, setDiceRoll] = useState(null);

  const isPlayerTurn = player.color === currentPlayer.color;

  useEffect(() => {
    if (diceRoll > 6) {
      onDiceRoll(diceRoll);
    } else {
      onDiceRoll(diceRoll);
    }
  }, [diceRoll, onDiceRoll]);

  useEffect(() => {
    setDiceRoll(null);
  }, [currentPlayer]);

  return (
    <div className={classes.player_controls} style={style}>
      <h2>{player.color}</h2>
      <div className={classes.dice_controls}>
        <div className={classes.diceImageContainer}>
          {!diceRoll && isPlayerTurn && <p>ROLL!</p>}
          {!diceRoll && !isPlayerTurn && <p>WAIT!</p>}
          {diceRoll && (
            <img
              src={`images/dice-${Math.floor(diceRoll)}.png`}
              alt={`dice-${Math.floor(diceRoll)}`}
            />
          )}
        </div>
        <button
          disabled={!isPlayerTurn || (diceRoll && diceRoll < 6)}
          onClick={e => {
            setDiceRoll(generateDiceRoll());
          }}
        >
          ROLL!
        </button>
        <button
          disabled={!isPlayerTurn}
          onClick={e => {
            setDiceRoll(null);
            onPassTurn();
          }}
        >
          Pass Turn
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
