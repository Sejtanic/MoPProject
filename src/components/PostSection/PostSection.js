import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeActions } from "../../store/store";
import SectionNavigation from "../SectionNavigation/SectionNavigation";
import Section from "../Section/Section";
import "./PostSection.css";
import Toggle from "../Ui/Toggle/Toggle";

const PostSection = () => {
  const [showFullContent, setShowFullContent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((store) => store.registeredUsers);
  const data = useSelector((store) => store.sectionData);
  const currentUser = useSelector((store) => store.name);
  const token = useSelector((store) => store.token);

  const sectionRef = useRef();
  const onLikeHandler = (e) => {
    //if there is no user send to loginpage
    if (!token) {
      navigate("/login");
      return;
    }
    //select id of liked element
    const elementId = +e.target.parentElement.parentElement.id;
    // if user alredy liked post next click will unlike
    if (
      data
        .find((element) => element.id === elementId)
        .likes?.includes(currentUser)
    ) {
      dispatch(storeActions.removeLikeFromPost(elementId));
      dispatch(
        storeActions.addActivity({
          user: currentUser,
          activity: {
            date: new Date().toLocaleDateString(),
            type: "Unlike post",
          },
        })
      );
      return;
    }
    //user like post
    dispatch(storeActions.likePost(elementId));
    //added activitL
    dispatch(
      storeActions.addActivity({
        user: currentUser,
        activity: {
          date: new Date().toLocaleDateString(),
          type: "Liked post",
        },
      })
    );
    //add notification
    dispatch(
      storeActions.addNotification({
        id: elementId,
        noti: { type: "  Liked", content: "", user: currentUser },
      })
    );
  };
  const posts = useSelector((state) => state.sectionData);

  const addCommentHandler = (e) => {
    if (!sectionRef.current.value) return;
    const elementId = +e.target.parentElement.parentElement.id;
    //User add comment
    dispatch(
      storeActions.addComment({
        id: elementId,
        comment: {
          id: Math.random(),
          username: currentUser,
          content: sectionRef.current.value,
        },
      })
    );
    //Activity added to user log
    dispatch(
      storeActions.addActivity({
        user: currentUser,
        activity: {
          date: new Date().toLocaleDateString(),
          type: "Commented",
          content: sectionRef.current.value,
        },
      })
    );
    //notificaion send to user
    dispatch(
      storeActions.addNotification({
        id: elementId,
        noti: {
          type: "  Commented",
          content: sectionRef.current.value,
          user: currentUser,
        },
      })
    );
    //added comment will go to user count
    dispatch(storeActions.userAddedComment(currentUser));
  };
  //toggle comments view
  const toggleHandler = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    //post-section-style
    <div
      className={
        showFullContent ? "post-section-style overflow " : "post-section-style "
      }
    >
      <SectionNavigation />
      <Toggle show={showFullContent} onClick={toggleHandler} />
      {posts.map((section) => (
        <Section
          addComment={addCommentHandler}
          onClick={onLikeHandler}
          ref={sectionRef}
          key={section.id}
          id={section.id}
          name={section.name}
          date={section.date}
          content={section.content}
          likes={section.likes}
          comments={section.comments}
        />
      ))}
    </div>
  );
};
export default PostSection;
