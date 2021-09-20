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

function App() {
  const [board, updateBoard] = useState(boardArr);
  const [selectedToken, setSelectedToken] = useState(null);
  const [diceRoll, setDiceRoll] = useState(null);
  const [currentPlayer, changeCurrentPlayer] = useState(players[0]);

  useEffect(() => {
    if (diceRoll > 6) {
      setDiceRoll(6);
    }
  }, [diceRoll]);

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

  const parkToken = (clickedToken, newPositon) => {
    if (selectedToken) {
      const oldPosition = board.findIndex(
        boardToken => boardToken?.id === selectedToken.id
      );
      updateBoard(oldBoard =>
        parkTokenRender(oldBoard, selectedToken, oldPosition, diceRoll)
      );
    }
  };

  const playToken = (clickedToken, newPositon) => {
    if (clickedToken?.position + diceRoll > 39) {
      return;
    }

    if (clickedToken?.id === selectedToken?.id) {
      return;
    }

    if (clickedToken) {
      setSelectedToken(clickedToken);
    }

    if (selectedToken) {
      if (selectedToken.playerColor !== currentPlayer.color) {
        return;
      }

      const oldPosition = board.findIndex(
        boardToken => boardToken?.id === selectedToken.id
      );

      if (
        oldPosition + diceRoll === newPositon ||
        oldPosition + diceRoll > 39
      ) {
        updateBoard(oldBoard =>
          changeTokenPositionRender(
            oldBoard,
            selectedToken,
            oldPosition,
            diceRoll
          )
        );
        setDiceRoll(null);
        if (diceRoll !== 6) {
          onPassTurn();
        }

        return;
      }
      return;
    }

    if (!clickedToken && !selectedToken) {
      return;
    }
  };

  const moveTokenToBoard = (clickedToken, positon) => {
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
