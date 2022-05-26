import Navigation from "../../navigation/Navigation";
import backGround from "../../../image/background.webp";
import "./ChangePassword.css";
import { storeActions } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import Button from "../../Ui/Button/Button";

const ChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSucess, setIsSucces] = useState("");
  const passRef = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.name);

  const newPasswordHandler = (e) => {
    e.preventDefault();
    const passwordValue = passRef.current.value;
    //check if password is 5 chars long
    if (passwordValue.trim().length < 5) {
      setErrorMessage("Password to short");
      setIsSucces(false);

      return;
    }
    //change password
    dispatch(
      storeActions.changePassword({
        currentUser,
        newPassword: passwordValue,
      })
    );
    setIsSucces(true);
    setErrorMessage("Password is changed");
  };
  return (
    <div className="home-page-style">
      <div className="profile-section">
        <p className="profile-section-user">{currentUser}</p>
        <div className="profile-section-navigation">
          <p>Enter New Password</p>
          <form className="change-password-form">
            <input ref={passRef} type="password" placeholder="new password" />
            <Button onClick={newPasswordHandler} name={"Change"} />

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
export default ChangePassword;
