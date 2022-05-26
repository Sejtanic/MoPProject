import Navigation from "../../navigation/Navigation";
import backGround from "../../../image/background.webp";
import "./ChangeUsername.css";
import { storeActions } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import Button from "../../Ui/Button/Button";

const ChangeUsername = () => {
  const registeredUsers = useSelector((state) => state.registeredUsers);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSucess, setIsSucces] = useState("");
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.name);

  const newUsernameHandler = (e) => {
    e.preventDefault();
    const usernameValue = usernameRef.current.value;

    //check if there is any value in input
    if (usernameValue.trim("").length === 0) {
      setErrorMessage("Enter New Username");
      setIsSucces(false);

      return;
    }
    if (!usernameValue.includes("@") || !usernameValue.includes(".com")) {
      setErrorMessage("Username is not valid");
      setIsSucces(false);
      return;
    }
    //check if username already exists
    if (registeredUsers.find((element) => element.username === usernameValue)) {
      setErrorMessage("Username alredy in use");
      setIsSucces(false);
      return;
    }
    //change username
    dispatch(
      storeActions.changeUsername({
        currentUser,
        newUsername: usernameValue,
      })
    );
    dispatch(storeActions.addCurrentUser(usernameValue));
    setIsSucces(true);
    setErrorMessage("Username is changed");
  };
  return (
    <div className="home-page-style">
      <div className="profile-section">
        <p className="profile-section-user">{currentUser}</p>
        <div className="profile-section-navigation">
          <p>Enter New Username</p>
          <form className="change-password-form">
            <input ref={usernameRef} type="email" placeholder="new username" />
            <Button onClick={newUsernameHandler} name={"Change"} />

            <div
              className={
                isSucess
                  ? "change-password-error green"
                  : "change-password-error red"
              }
            >
              <p>{errorMessage}</p>
            </div>
          </form>
        </div>
      </div>
      <div className="navigation-section">
        <Navigation />
      </div>
    </div>
  );
};
export default ChangeUsername;
