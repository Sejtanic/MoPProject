import Navigation from "../../navigation/Navigation";
import { useRef, useState } from "react";
import "./CreatePost.css";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import backGround from "../../../image/background.webp";
import Button from "../../Ui/Button/Button";

const CreatePost = () => {
  const [errorMessage, setErrorMessage] = useState();
  const currentUser = useSelector((store) => store.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const postRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const postValue = postRef.current.value;
    if (!postValue) {
      setErrorMessage("Please enter your text");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    dispatch(
      storeActions.addNewPost({
        id: Math.random(),
        likes: [1],
        comments: [1],
        name: currentUser,
        timestamp: new Date().getTime(),
        date: new Date().toLocaleDateString(),
        content: postValue,
      })
    );
    dispatch(
      storeActions.addActivity({
        user: currentUser,
        activity: {
          date: new Date().toLocaleDateString(),
          type: "Create Post",
          content: postValue,
        },
      })
    );
    navigate("/");
  };
  return (
    <div className="home-page-style">
      <div className="create-post-section">
        <h2>Create Post</h2>
        <form className="create-post-form" onSubmit={onSubmitHandler}>
          <div className="create-post-name-selection"></div>
          <div className="create-post-post-text">
            <label>Share your thoughts:</label>
            <textarea placeholder="Start typing.." ref={postRef}></textarea>
          </div>
          <p>{errorMessage}</p>
          <div className="create-post-button">
            <Button onClic={onSubmitHandler} name={"Post"} />
          </div>
        </form>
      </div>
      <div className="navigation-section">
        <Navigation />
      </div>
    </div>
  );
};
export default CreatePost;
