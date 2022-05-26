import Navigation from "../../navigation/Navigation";
import backGround from "../../../image/background.webp";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Notification.css";
import NotificationSection from "../../NotificationSection/NotificationSection";
import Toggle from "../../Ui/Toggle/Toggle";

const Notification = () => {
  const [showFullContent, setShowFullContent] = useState(false);

  const currentUser = useSelector((state) => state.name);
  const allNotifications = useSelector((state) => state.registeredUsers).find(
    (ele) => ele.username === currentUser
  );

  const toggleHandler = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="home-page-style">
      <div className="profile-section">
        <h2>Notifications</h2>
        <Toggle show={showFullContent} onClick={toggleHandler} />
        <div
          className={
            showFullContent
              ? "profile-notification-section overflow"
              : "profile-notification-section"
          }
        >
          {allNotifications?.notifications.map((ele) => (
            <NotificationSection
              key={Math.random()}
              user={ele.user}
              content={ele.content}
              type={ele.type}
            />
          ))}
        </div>
      </div>
      <div className="navigation-section">
        <Navigation />
      </div>
    </div>
  );
};
export default Notification;
