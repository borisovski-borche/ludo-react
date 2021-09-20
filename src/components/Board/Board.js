import classess from "./Board.module.scss";
import BoardField from "./BoardField/BoardField";
import PlayerOut from "../PlayerOut/PlayerOut";
import PlayerHome from "../PlayerHome/PlayerHome";

const fieldStartColors = ["green", "red", "blue", "yellow"];

const Board = props => {
  const { boardArr, players, onTokenSelect, style, onStartToken, onParkToken } =
    props;

  return (
    <div style={style} className={classess.board}>
      {players.map((player, i) => (
        <PlayerHome
          onTokenSelect={onParkToken}
          player={player}
          style={{ gridArea: `ph${i + 1}` }}
          key={i}
        />
      ))}

      {players.map((player, i) => (
        <PlayerOut
          onTokenSelect={onStartToken}
          player={player}
          style={{ gridArea: `p${i + 1}` }}
          key={i}
        />
      ))}
      {boardArr.map((object, i) => (
        <BoardField
          token={object}
          onTokenSelect={onTokenSelect}
          key={i}
          position={i}
          style={{
            gridArea: `f${i}`,
            backgroundColor: i % 10 === 0 ? fieldStartColors[i / 10] : "",
          }}
        />
      ))}
    </div>
  );
};

export default Board;
