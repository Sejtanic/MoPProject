import Navigation from "../../navigation/Navigation";
import backGround from "../../../image/background.webp";
import "./Activity.css";
import ActivitySection from "../../ActivitySection/ActivitySection";
import { useSelector } from "react-redux";
import { useState } from "react";
import Toggle from "../../Ui/Toggle/Toggle";

const Activity = () => {
  const [showFullContent, setShowFullContent] = useState(false);

  //find corect username of which to get activity data
  const currentUser = useSelector((state) => state.name);
  const allActivity = useSelector((state) => state.registeredUsers).find(
    (ele) => ele.username === currentUser
  );

  const toggleHandler = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="home-page-style">
      <div className="profile-section">
        <h2>Activity</h2>
        <Toggle show={showFullContent} onClick={toggleHandler} />
        <div
          className={
            showFullContent
              ? "profile-activity-section overflow"
              : "profile-activity-section"
          }
        >
          {allActivity?.activity.map((ele) => (
            <ActivitySection
              type={ele.type}
              date={ele.date}
              content={ele.content}
              key={Math.random()}
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
export default Activity;
