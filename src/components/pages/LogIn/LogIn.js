import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../navigation/Navigation";
import { storeActions } from "../../../store/store";
import "./LogIn.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import backGround from "../../../image/background.webp";
import Button from "../../Ui/Button/Button";

const LogIn = () => {
  const registeredUsers = useSelector((store) => store.registeredUsers);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passValue = passRef.current.value;
    if (emailValue.trim(" ").length === 0) {
      setErrorMessage("Please enter email");
      return;
    }
    if (passValue.trim(" ").length === 0) {
      setErrorMessage("Please enter password");
      return;
    }
    if (
      registeredUsers.find(
        (element) =>
          element.username === emailValue && element.password === passValue
      )
    ) {
      localStorage.setItem("name", emailRef.current.value);
      localStorage.setItem("token", "token");
      dispatch(storeActions.addCurrentUser(emailRef.current.value));
      dispatch(storeActions.addToken("token"));
      navigate("/");
    } else {
      setErrorMessage("Username or password wrong");
    }
    ///// old codeeee////////////////////////////////////////////////////////
    // fetch(
    //   "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFe2xhKb8uhKWshVFfheSq1Hzq2QhBcas",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: emailValue,
    //       password: passValue,
    //       returnSecureToken: true,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       setErrorMessage("");
    //       dispatch(storeActions.addCurrentUser(emailRef.current.value));
    //       navigate("/login");
    //       return res.json();
    //     } else {
    //       throw new Error("Incorrect email or password.");
    //       return res.json().then((data) => {});
    //     }
    //   })
    //   .then((data) => {
    //     dispatch(storeActions.addToken(data.idToken));
    //     navigate("/");
    //   })
    //   .catch((error) => setErrorMessage(error.message));
  };
  return (
    <div className="home-page-style">
      <div className="login-section">
        <h2 className="login-section-header">Log in</h2>
        <div>
          <form onSubmit={onSubmitHandler} className="login-section-form">
            <div className="login-section-email">
              <label>Enter Email:</label>
              <input ref={emailRef} type="email" placeholder="email" />
            </div>
            <div className="login-section-password">
              <label>Enter Password:</label>
              <input ref={passRef} type="password" placeholder="password" />
            </div>
            <p className="error">{errorMessage}</p>

            <Button
              onClick={onSubmitHandler}
              className="login-btn"
              name={"Log In"}
            />
          </form>
        </div>
      </div>
      <div className="navigation-section">
        <Navigation />
      </div>
    </div>
  );
};
export default LogIn;
