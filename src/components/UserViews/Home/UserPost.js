import React, { useContext, useState } from "react";
import { createPost } from "../../../services/postServices.js";
import StateContext from "../../../state-ctx/state-ctx.js";
import UserState from "../../../state-ctx/userState.js";
import Button from "../../UI/Button.js";
import classes from "./UserPost.module.css";
const UserPost = () => {
  const ctx = useContext(StateContext);
  const [post, setPost] = useState("");
  const { userData: ctxUserData } = useContext(UserState);
  const onPublishHandler = async () => {
    if (post.trim().length === 0) {
      return;
    }
    await createPost(post, ctxUserData);
    setPost("");
    ctx.setPostUpdated(true);
  };
  const postOnChangeHandler = (e) => {
    setPost(e.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <p>Your post</p>
        </div>
      </div>
      <div className={classes.text}>
        <textarea
          placeholder="Your thoughts..."
          onChange={postOnChangeHandler}
          value={post}
        ></textarea>
      </div>
      <div className={classes.btn}>
        <Button onClick={onPublishHandler}>Publish</Button>
      </div>
    </div>
  );
};

export default UserPost;
