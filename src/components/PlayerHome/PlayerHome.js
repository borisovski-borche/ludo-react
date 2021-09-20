import BoardField from "../Board/BoardField/BoardField";
import classes from "./PlayerHome.module.scss";

const PlayerHome = props => {
  const { player, onTokenSelect } = props;

  const tokenArr = [undefined, undefined, undefined, undefined];

  player.tokens.forEach(token => {
    tokenArr[token.parkPosition] = token;
  });

  return (
    <div
      className={classes.player_home + " " + classes[`player_${player.color}`]}
      style={props.style}
    >
      {tokenArr.map((token, i) => {
        return (
          <BoardField
            onTokenSelect={onTokenSelect}
            token={token?.inHomeBase && token}
            style={{ backgroundColor: player.color }}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default PlayerHome;
