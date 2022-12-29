import React, { useContext } from "react";
import StateContext from "../state-ctx/state-ctx.js";

import classes from "./LoginForm.module.css";
const LoginFrom = (props) => {
  const ctx = useContext(StateContext);
  return (
    <>
      <div className={classes.container}>
        <div>
          <h3 className={classes.header}>Enter username and password</h3>
        </div>
        <div>
          <form className={classes.inputs}>
            <input
              className={classes.username}
              type="text"
              placeholder="Username"
            />
            <input
              className={classes.password}
              type="password"
              placeholder="Password"
            />
            <button
              onClick={ctx.onHasUserLogged}
              className={classes.btn}
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginFrom;