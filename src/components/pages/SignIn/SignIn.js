import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeActions } from "../../../store/store";
import Navigation from "../../navigation/Navigation";
import backGround from "../../../image/background.webp";

import "./SignIn.css";
import Button from "../../Ui/Button/Button";

const SignIn = () => {
  const registeredUsers = useSelector((state) => state.registeredUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();
  const passRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passValue = passRef.current.value;

    if (registeredUsers.find((element) => element.username === emailValue)) {
      setErrorMessage("Username alredy exist");
      return;
    }
    if (emailValue.trim(" ").length === 0) {
      setErrorMessage("Please enter email");
      return;
    }
    if (!emailValue.includes("@") || !emailValue.includes(".com")) {
      setErrorMessage("Email is not valid");
      return;
    }
    if (passValue.trim(" ").length < 5) {
      setErrorMessage("Password to short");
      return;
    }

    dispatch(
      storeActions.addNewUser({
        username: emailValue,
        activity: [],
        notifications: [{ username: "" }],
        comment: 0,
        notCounter: 0,
        password: passValue,
      })
    );
    navigate("/login");
  };
  return (
    <div className="home-page-style">
      <div className="signin-section">
        <h2>Sign Up</h2>
        <div>
          <form onSubmit={onSubmitHandler} className="signin-section-form">
            <div className="signin-section-email">
              <label>Enter Email:</label>
              <input ref={emailRef} type="email" placeholder="email" />
            </div>
            <div className="signin-section-password">
              <label>Enter Password:</label>
              <input ref={passRef} type="password" placeholder="password" />
            </div>
            <p className="error">{errorMessage}</p>
            <Button onClick={onSubmitHandler} name={"Sign In"} />
          </form>
        </div>
      </div>
      <div className="navigation-section">
        <Navigation />
      </div>
    </div>
  );
};
export default SignIn;
