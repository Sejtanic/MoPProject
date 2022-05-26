import "./Toggle.css";
const Toggle = (props) => {
  return (
    <p onClick={props.onClick} className="toggle-style">
      {props.show ? "Show Less" : "Show More"}
    </p>
  );
};
export default Toggle;
