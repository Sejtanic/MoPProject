import "./Delete.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Delete = (props) => {
  return (
    <Tippy content="Delete">
      <p
        className="delete-button-style"
        onClick={props.onClick}
        data-tooltip="Delite"
      >
        {props.name === props.curentUser ? "X" : ""}
      </p>
    </Tippy>
  );
};
export default Delete;
