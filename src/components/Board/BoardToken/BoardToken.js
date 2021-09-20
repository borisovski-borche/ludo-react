import classes from "./BoardToken.module.scss";

const BoardToken = props => {
  const { token } = props;

  return (
    <div className={classes.board_token + " " + classes[token.playerColor]}>
      <p>{token.tokenNumber}</p>
    </div>
  );
};

export default BoardToken;
