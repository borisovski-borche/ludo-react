import BoardToken from "../BoardToken/BoardToken";
import classes from "./BoardField.module.scss";

const BoardField = props => {
  return (
    <div
      style={props.style}
      className={classes.board_field}
      onClick={e => props.onTokenSelect(props.token, props.position)}
    >
      {props.token && <BoardToken token={props.token} />}
    </div>
  );
};

export default BoardField;
