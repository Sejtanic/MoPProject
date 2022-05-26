import "./Button.css";
const Button = (props) => {
  return (
    <button type="submit" onClick={props.onClick} className="btn-style">
      {props.name}
    </button>
  );
};
export default Button;
