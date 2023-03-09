import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../redux/actions/authAction";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const loggedIn = useSelector((state) => state?.auth?.loggedIn || false);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUp(username, password));
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    !loggedIn && (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  );
};

export default SignUpForm;
