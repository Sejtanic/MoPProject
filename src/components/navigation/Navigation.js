import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { storeActions } from "../../store/store";
import Notification from "../Ui/Notification/Notification";
import "./Navigation.css";
const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.token);
  const currentUser = useSelector((store) => store.name);
  const notification = useSelector((store) =>
    store.registeredUsers.find((ele) => ele.username === currentUser)
  )?.notCounter;

  //log out
  const logOutHandler = (e) => {
    e.preventDefault();
    dispatch(storeActions.logOut());
    localStorage.clear();
    navigate("/");
  };
  const onHandleNotification = () => {
    dispatch(storeActions.clearNotifications(currentUser));
    navigate("/profile/notification");
  };
  return (
    <div className="navigation-style">
      <div className="navigation-header">
        <h1>SUBSIDO</h1>
        <p>share your problems with others</p>
      </div>
      <div className="navigation-routes">
        <div className="user-info-seciton-style">
          <Link to="/profile">{currentUser}</Link>
          <Notification
            onClick={onHandleNotification}
            notification={notification}
          />
        </div>
        <NavLink
          to="/"
          className={(isActive) => (isActive.isActive ? "selected" : "")}
        >
          <h3>Home</h3>
        </NavLink>
        {token && (
          <NavLink
            className={(isActive) => (isActive.isActive ? "selected" : "")}
            to="/createpost"
          >
            <h3>Create Post</h3>
          </NavLink>
        )}
        <NavLink
          className={(isActive) => (isActive.isActive ? "selected" : "")}
          to="/about"
        >
          <h3>About</h3>
        </NavLink>
        {!token && (
          <NavLink
            className={(isActive) => (isActive.isActive ? "selected" : "")}
            to="/login"
          >
            <h3>Log In</h3>
          </NavLink>
        )}
        {token && (
          <NavLink
            className={(isActive) =>
              isActive.isActive ? "astyle selected" : "astyle"
            }
            to="/profile"
          >
            Profile
          </NavLink>
        )}
        {!token && (
          <NavLink
            className={(isActive) => (isActive.isActive ? "selected" : "")}
            to="/signin"
          >
            <h3>Sign Up</h3>
          </NavLink>
        )}
        {token && (
          <a className="astyle" onClick={logOutHandler}>
            Log Out
          </a>
        )}
      </div>
      <div className="navigation-footer">
        <p>&copy; 2022 Subsido</p>
      </div>
    </div>
  );
};
export default Navigation;
