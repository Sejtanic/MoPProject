import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { storeActions } from "../../store/store";
import "./SectionNavigation.css";
const SectionNavigation = () => {
  const dispatch = useDispatch();
  const totalAmountPosts = useSelector((state) => state.sectionData);
  const hotQuestionHandler = () => {
    dispatch(storeActions.sortComentsize());
  };
  const newPostHandler = () => {
    dispatch(storeActions.sortTime());
  };
  const onSortHandler = () => {
    dispatch(storeActions.sortUsersByCommentNumber());
  };
  return (
    <div className="post-section-navigation">
      <div className="post-section-navigation-total">
        <p>Posts :</p>
        <p>{totalAmountPosts.length}</p>
      </div>
      <Link to="/" onClick={newPostHandler}>
        Latest
      </Link>
      <Link onClick={onSortHandler} to="/home/bestusers">
        Top Users
      </Link>
      <Link to="/" onClick={hotQuestionHandler}>
        Hot question
      </Link>
    </div>
  );
};
export default SectionNavigation;
