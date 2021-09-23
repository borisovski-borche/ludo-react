import { Fragment, useState, useEffect, useCallback } from "react";

import "./App.scss";
import Board from "./components/Board/Board";
import PlayerControls from "./components/PlayerControls/PlayerControls";

import {
  changeTokenPositionRender,
  initialiseTokenRender,
  parkTokenRender,
  players,
  moveValidator,
} from "./game-logic/game.service";

const boardArr = Array(40);
boardArr.fill(undefined, 0, 40);

//manual assignment for testing purposes
// players[0].tokens[0].inPlay = true;
// players[0].tokens[1].inPlay = true;
// players[0].tokens[2].inPlay = true;
// players[0].tokens[3].inPlay = true;

// players[1].tokens[0].inPlay = true;
// players[1].tokens[1].inPlay = true;
// players[1].tokens[2].inPlay = true;

// boardArr[0] = players[1].tokens[0];
// boardArr[1] = players[1].tokens[1];
// boardArr[38] = players[1].tokens[2];

// boardArr[37] = players[0].tokens[0];
// boardArr[36] = players[0].tokens[1];
// boardArr[35] = players[0].tokens[2];
// boardArr[34] = players[0].tokens[3];

function App() {
  const [board, updateBoard] = useState(boardArr);
  const [selectedToken, setSelectedToken] = useState(null);
  const [diceRoll, setDiceRoll] = useState(null);
  const [currentPlayer, changeCurrentPlayer] = useState(players[0]);

  useEffect(() => {}, [selectedToken]);

  useEffect(() => {
    let timer;

    if (diceRoll !== null) {
      const isValid = moveValidator(board, diceRoll, currentPlayer);

      if (!isValid) {
        timer = setTimeout(() => {
          onPassTurn();
        }, 1000);
      }

      if (isValid === "start") {
        timer = setTimeout(() => {
          onPassTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [diceRoll, board, currentPlayer]);

  const onPlayerRoll = useCallback(roll => {
    if (!roll) return;

    setDiceRoll(Math.floor(roll));
  }, []);

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
    setDiceRoll(null);
  };

  const parkToken = (clickedToken, newPosition) => {
    if (clickedToken?.id === selectedToken?.id) {
      return;
    }

    if (!clickedToken && !selectedToken) {
      return;
    }

    if (selectedToken && diceRoll && !clickedToken) {
      if (selectedToken.playerColor === currentPlayer.color) {
        const oldPosition = board.findIndex(
          boardToken => boardToken?.id === selectedToken.id
        );
        updateBoard(oldBoard =>
          parkTokenRender(oldBoard, selectedToken, oldPosition, diceRoll)
        );
        if (!clickedToken) {
          setDiceRoll(null);
        }
        if (diceRoll < 6) {
          onPassTurn();
        }
      }
    }

    if (clickedToken) {
      setSelectedToken(clickedToken);
      return;
    }
  };

  const playToken = (clickedToken, newPosition) => {
    if (selectedToken?.position + diceRoll > 39) {
      setSelectedToken(clickedToken);
      return;
    }

    if (clickedToken?.id === selectedToken?.id) {
      return;
    }

    if (!clickedToken && !selectedToken) {
      return;
    }

    if (selectedToken) {
      if (
        selectedToken.playerColor === currentPlayer.color &&
        selectedToken.playerColor !== clickedToken?.playerColor
      ) {
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
    if (diceRoll < 6) {
      return;
    }

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
            onDiceRoll={onPlayerRoll}
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
