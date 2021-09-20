import classes from "./PlayerOut.module.scss";
import BoardField from "../Board/BoardField/BoardField";

const PlayerOut = props => {
  const { player, onTokenSelect } = props;

  return (
    <div className={classes.player_out} style={props.style}>
      {player.tokens.map((token, i) => (
        <BoardField
          key={token.tokenNumber}
          onTokenSelect={onTokenSelect}
          style={{ gridArea: `f${i}`, backgroundColor: player.color }}
          token={!token.inPlay && token}
        />
      ))}
    </div>
  );
};

export default PlayerOut;
