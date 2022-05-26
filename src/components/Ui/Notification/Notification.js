import "./Notification.css";
const Notification = (props) => {
  return (
    <p onClick={props.onClick} className="notification-style">
      {props.notification ? props.notification : ""}
    </p>
  );
};
export default Notification;
