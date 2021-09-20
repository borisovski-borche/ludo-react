import { Fragment, useState, useEffect } from "react";

import "./App.scss";
import Board from "./components/Board/Board";
import PlayerControls from "./components/PlayerControls/PlayerControls";

import {
  changeTokenPositionRender,
  initialiseTokenRender,
  parkTokenRender,
  players,
} from "./game-logic/game.service";

const boardArr = Array(40);
boardArr.fill(undefined, 0, 40);

// players[0].tokens[0].inPlay = true;
// players[0].tokens[0].position = 35;

// players[0].tokens[1].inPlay = true;
// players[0].tokens[1].position = 36;

// players[1].tokens[1].inPlay = true;
// players[1].tokens[0].inPlay = true;
// players[1].tokens[2].inPlay = true;
// players[1].tokens[3].inPlay = true;

// players[2].tokens[1].inPlay = true;
// players[2].tokens[0].inPlay = true;
// players[2].tokens[2].inPlay = true;
// players[2].tokens[3].inPlay = true;

// boardArr[31] = players[1].tokens[0];
// boardArr[32] = players[1].tokens[1];
// boardArr[33] = players[1].tokens[2];
// boardArr[34] = players[1].tokens[3];

// boardArr[35] = players[2].tokens[0];
// boardArr[36] = players[2].tokens[1];
// boardArr[37] = players[2].tokens[2];
// boardArr[38] = players[2].tokens[3];

// players[1].tokens[1].position = 37;
// players[1].tokens[1].inPlay = true;

// boardArr[37] = players[1].tokens[1];

function App() {
  const [board, updateBoard] = useState(boardArr);
  const [selectedToken, setSelectedToken] = useState(null);
  const [diceRoll, setDiceRoll] = useState(null);
  const [currentPlayer, changeCurrentPlayer] = useState(players[1]);

  useEffect(() => {
    console.log("test");
    if (diceRoll > 6) {
      setDiceRoll(6);
    }
  }, [diceRoll]);

  useEffect(() => {
    console.log(selectedToken);
  }, [selectedToken]);

  const onPassTurn = () => {
    changeCurrentPlayer(prevPlayer => {
      const index = players.findIndex(
        player => player.color === prevPlayer.color
      );
      if (index === 3) {
        return players[0];
      }
      return players[index + 1];
    });
  };

  const parkToken = (clickedToken, newPosition) => {
    console.log("above the check");

    if (clickedToken) {
      return;
    }

    console.log("below the check");
    console.log(selectedToken);

    if (selectedToken) {
      console.log("in the bug");
      console.log(selectedToken.playerColor);
      console.log(currentPlayer.color);
      if (selectedToken.playerColor === currentPlayer.color) {
        const oldPosition = board.findIndex(
          boardToken => boardToken?.id === selectedToken.id
        );
        updateBoard(oldBoard =>
          parkTokenRender(oldBoard, selectedToken, oldPosition, diceRoll)
        );
        setDiceRoll(null);
        if (diceRoll < 6) {
          onPassTurn();
        }
      }
    }
  };

  const playToken = (clickedToken, newPosition) => {
    if (selectedToken?.position + diceRoll > 39) {
      setSelectedToken(clickedToken);
      return;
    }

    if (clickedToken?.id === selectedToken?.id) {
      console.log("here 1");
      return;
    }

    if (!clickedToken && !selectedToken) {
      console.log("here 3");
      return;
    }

    if (selectedToken) {
      if (selectedToken.playerColor === currentPlayer.color) {
        const oldPosition = board.findIndex(
          boardToken => boardToken?.id === selectedToken.id
        );

        if (
          oldPosition + diceRoll === newPosition ||
          oldPosition + diceRoll > 39
        ) {
          updateBoard(oldBoard =>
            changeTokenPositionRender(oldBoard, selectedToken, diceRoll)
          );
          setDiceRoll(null);
          if (diceRoll < 6) {
            onPassTurn();
          }
        }
      }
    }

    if (clickedToken) {
      setSelectedToken(clickedToken);
      return;
    }
  };

  const moveTokenToBoard = (clickedToken, position) => {
    updateBoard(oldBoard =>
      initialiseTokenRender(oldBoard, currentPlayer, clickedToken, diceRoll)
    );
    setDiceRoll(null);
  };

  return (
    <Fragment>
      <div className="App">
        <Board
          boardArr={board}
          players={players}
          onTokenSelect={playToken}
          onStartToken={moveTokenToBoard}
          onParkToken={parkToken}
          style={{ gridArea: "br", justifySelf: "center" }}
        ></Board>
        {players.map((player, i) => (
          <PlayerControls
            onDiceRoll={setDiceRoll}
            onPassTurn={onPassTurn}
            key={player.color}
            player={player}
            currentPlayer={currentPlayer}
            style={{
              gridArea: `p${i + 1}c`,
              justifySelf: (i + 1) % 3 === 1 ? "end" : "",
            }}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default App;
