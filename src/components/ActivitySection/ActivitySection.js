import "./ActivitySection.css";
const ActivitySection = (props) => {
  return (
    <div className="activity-section-style">
      <div className="activity-section-info">
        <p>{props.type}</p>
        <p>{props.date}</p>
      </div>
      <p>{props.content ? props.content : ""}</p>
    </div>
  );
};
export default ActivitySection;
