import Navigation from "../../navigation/Navigation";
import backGround from "../../../image/background.webp";
import "./BestUsers.css";
import { useState } from "react";
import SectionNavigation from "../../SectionNavigation/SectionNavigation";
import { useSelector } from "react-redux";
import Toggle from "../../Ui/Toggle/Toggle";

const BestUsers = () => {
  const [showFullContent, setShowFullContent] = useState(false);

  const userList = useSelector((state) => state.registeredUsers);
  //toggle to display whole list
  const toggleHandler = () => {
    setShowFullContent(!showFullContent);
  };
  return (
    <div className="home-page-style">
      <div className="bestusers-section-style">
        <div className="bestusers-display-section">
          <SectionNavigation />
          <Toggle show={showFullContent} onClick={toggleHandler} />
          <div
            className={
              showFullContent
                ? "bestusers-list-section overflow "
                : "bestusers-list-section "
            }
          >
            {userList.map((ele) => (
              <div key={Math.random()} className="single-user-style">
                <p>{`${ele.comment} Post by: ${ele.username}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="navigation-section">
        <Navigation />
      </div>
    </div>
  );
};
export default BestUsers;
