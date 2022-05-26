import About from "./components/pages/About/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import CreatePost from "./components/pages/CreatePost/CreatePost";
import LogIn from "./components/pages/LogIn/LogIn";
import SignIn from "./components/pages/SignIn/SignIn";
import Profile from "./components/pages/Porfile/Profile";
import Activity from "./components/pages/Activity/Activity";
import Notification from "./components/pages/Notification/Notification";
import BestUsers from "./components/pages/BestUsers/BestUsers";
import ChangePassword from "./components/pages/ChangePassword/ChangePassword";
import ChangeUsername from "./components/pages/ChangeUsername/ChangeUsername";
import { useSelector } from "react-redux";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStore, sendStateData, storeActions } from "./store/store";
// import { MongoClient } from "mongodb";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    dispatch(fetchStore());
  }, []);
  useEffect(() => {
    if (state.changed) {
      dispatch(sendStateData(state));
    }
  }, [state, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {token && <Route path="/createpost" element={<CreatePost />} />}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signin" element={<SignIn />} />
          {token && <Route path="/profile" element={<Profile />} />}
          {token && <Route path="/profile/activity" element={<Activity />} />}
          {token && (
            <Route path="/profile/notification" element={<Notification />} />
          )}
          <Route path="/home/bestusers" element={<BestUsers />} />
          {token && (
            <Route
              path="/profile/changepassword"
              element={<ChangePassword />}
            />
          )}
          {token && (
            <Route
              path="/profile/changeusername"
              element={<ChangeUsername />}
            />
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
