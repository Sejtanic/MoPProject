import Navigation from "../../navigation/Navigation";
import { Link } from "react-router-dom";
import "./About.css";
import { useSelector } from "react-redux";

const About = () => {
  const token = useSelector((store) => store.token);
  return (
    <div className="home-page-style">
      <div className="about-section">
        <h2 className="about-header-title">About Subsido</h2>
        <div className="about-info">
          <h3>
            Subsido is a site created for people who have some kind of problem
            but no way to ease their soul. With subsido you have a platform
            where you can express your thoughts and problems.
          </h3>
          <h2> Why present your problems to people?</h2>
          <h3>
            Many studies have shown that presenting or discussing a problem is
            the first and most important step in solving the problem.
          </h3>
          <h2>Why Subsido?</h2>
          <h3>
            With Subsido you can share your problems with comunity of good
            people and get positive feedback back.
          </h3>
        </div>
        <div className="about-relocate">
          {!token && <Link to="/signin">Sign In</Link>}
          {!token && <p>or</p>}
          {!token && <Link to="/login">Log In</Link>}
          {token && <Link to="/createpost">Create Post</Link>}
        </div>
      </div>
      <div className="navigation-section">
        <Navigation />
      </div>
    </div>
  );
};
export default About;
