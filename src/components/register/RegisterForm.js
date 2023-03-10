import React, { useContext, useEffect, useState } from "react";
import Button from "../Utils/Button.js";
import { register } from "../../services/authServices.js";
import staticPic from "../../resources/profilePic.jpg";
import classes from "./RegisterForm.module.css";
import Background from "../Utils/Background.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../../resources/Spinner.js";
import UserState from "../../state-ctx/userState.js";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [repass, setRepass] = useState("");
  const [repassIsValid, setRepassIsValid] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userData: ctxUserData, setUserData: ctxSetUserData } =
    useContext(UserState);

  let isFormValid = false;
  useEffect(() => {
    if (email.trim().includes("@")) {
      setEmailIsValid(true);
    }
    if (username.trim().length > 2) {
      setUsernameIsValid(true);
    }
    if (password.trim().length > 7) {
      setPasswordIsValid(true);
    }
    if (repass === password) {
      setRepassIsValid(true);
    }
  }, [email, username, password, repass]);

  isFormValid =
    emailIsValid && usernameIsValid && passwordIsValid && repassIsValid;

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const usernameOnChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const repassOnChangeHandler = (e) => {
    setRepass(e.target.value);
  };
  const imageOnChangeHandler = (e) => {
    setImageUrl(e.target.value);
  };
  const onSignupHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    try {
      if (password !== repass) {
        throw new Error(`Passwords dont match`);
      }
      setIsLoading(true);
      const user = await register(email, username, password, imageUrl);
      user.displayImage = user.imageUrl ? user.imageUrl : staticPic;
      ctxSetUserData(user);
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          _id: user._id,
          accessToken: user.accessToken,
        })
      );
      setIsLoading(false);
      navigate("/home");
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      console.log(error);
    }
  };
  return (
    <>
      <Background />
      <div className={classes.container}>
        <div>
          <h3 className={classes.header}>Create new account</h3>
        </div>
        <div>
          {error && <p className={classes.error}>{error}</p>}
          <form onSubmit={onSignupHandler} className={classes.inputs}>
            <div className={classes.input_field}>
              {"*"}
              <input
                className={classes.username}
                type="text"
                placeholder="Email"
                onChange={emailOnChangeHandler}
              />
            </div>
            <div className={classes.input_field}>
              {"*"}
              <input
                className={classes.username}
                type="text"
                placeholder="Username"
                onChange={usernameOnChangeHandler}
              />
            </div>
            <div className={classes.input_field}>
              {"*"}
              <input
                className={classes.password}
                type="password"
                placeholder="Password"
                onChange={passwordOnChangeHandler}
              />
            </div>
            <div className={classes.input_field}>
              {"*"}
              <input
                className={classes.password}
                type="password"
                placeholder="Repeat password"
                onChange={repassOnChangeHandler}
              />
            </div>
            <input
              className={classes.image}
              type="text"
              placeholder="Image URL"
              onChange={imageOnChangeHandler}
            />
            <Button
              className={classes.btn}
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? <Spinner w={15} h={17} /> : "Sign up"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
