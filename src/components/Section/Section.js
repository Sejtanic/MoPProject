import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeActions } from "../../store/store";
import Button from "../Ui/Button/Button";
import Delete from "../Ui/Delete/Delete";
import "./Section.css";

const Section = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [showComents, setShowComments] = useState(false);
  const token = useSelector((store) => store.token);
  const curentUser = useSelector((state) => state.name);

  //toggle comments view
  const toggleComments = () => {
    setShowComments(!showComents);
  };
  //delete whole post
  const removePostHandler = (e) => {
    const elementId = +e.target.parentElement.parentElement.id;
    dispatch(storeActions.deletePost(elementId));
  };
  //delete comment from post
  const deleteCommentHandler = (e) => {
    const commentId = +e.target.parentElement.parentElement.id;
    const elementId =
      +e.target.parentElement.parentElement.parentElement.parentElement.id;
    dispatch(
      storeActions.deleteComment({ elementId: elementId, commentId: commentId })
    );
  };
  return (
    <div className="section-style" id={props.id}>
      <div className="section-info">
        <p>{props.name}</p>
        <p>{props.date}</p>
        <Delete
          onClick={removePostHandler}
          curentUser={curentUser}
          name={props.name}
        />
      </div>
      <div className="section-content">{props.content}</div>
      <div className="section-reaction">
        <p
          onClick={props.onClick}
          className={
            props.likes?.includes(curentUser)
              ? "section-reaction-heart red"
              : `section-reaction-heart`
          }
        >
          &#10084;
        </p>

        <p>{props.likes ? props.likes.length - 1 : ""}</p>
        <p>{props.likes ? "Like" : ""}</p>
        <p onClick={toggleComments} className="btn little">
          Comments{" "}
          {props.comments?.length === 0 ? "" : props.comments?.length - 1}
        </p>
      </div>
      {showComents && (
        <div className="section-comment">
          {token && <textarea ref={ref} placeholder={"Add comment"} />}
          {token && <Button onClick={props.addComment} name={"Post"} />}
        </div>
      )}
      {showComents && (
        <div>
          {props.comments?.map((ele) => (
            <div
              id={ele.id}
              className="section-single-comment"
              key={Math.random()}
            >
              <div className="section-single-comment-info">
                <p className="comment-username">{ele.username}</p>
                <Delete
                  onClick={deleteCommentHandler}
                  name={ele.username}
                  curentUser={curentUser}
                />
              </div>
              <p className="comment-content">{ele.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
export default Section;
