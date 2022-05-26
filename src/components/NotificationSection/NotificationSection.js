import "./NotificationSection.css";
const NotificationSection = (props) => {
  return (
    <div className="notification-section">
      <p>{props.user + props.type + " your post"}</p>
      <p className="notification-content">{props.content}</p>
    </div>
  );
};
export default NotificationSection;
