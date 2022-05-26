import Navigation from "../../navigation/Navigation";
import PostSection from "../../PostSection/PostSection";
import backGround from "../../../image/background.webp";
import redbg from "../../../image/redbg.jpg";
import greybg from "../../../image/grey.jpg";
import "./Home.css";
import { Fragment } from "react";

const Home = () => {
  return (
    <div className="home-page-style">
      <div className="post-section">
        <PostSection />
      </div>
      <div className="navigation-section">
        <Navigation />
      </div>
    </div>
  );
};
export default Home;
