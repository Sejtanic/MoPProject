import Navigation from "../../navigation/Navigation";
import backGround from "../../../image/background.webp";
import { Link } from "react-router-dom";
import "./Profile.css";
import { storeActions } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.name);
  const notificationOnHandler = () => {
    dispatch(storeActions.clearNotifications(currentUser));
  };
  return (
    <div className="home-page-style">
      <div className="profile-section">
        <p className="profile-section-user">{currentUser}</p>
        <div className="profile-section-navigation">
          <Link to="/profile/activity">Activity</Link>
          <Link onClick={notificationOnHandler} to="/profile/notification">
            Notification
          </Link>
          <Link to="/profile/changepassword">Change Password</Link>
          <Link to="/profile/changeusername">Change Username</Link>
        </div>
      </div>
      <div className="navigation-section">
        <Navigation />
      </div>
    </div>
  );
};
export default Profile;
