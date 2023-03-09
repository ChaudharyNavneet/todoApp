import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/authAction";
import { fetchTodos } from "../redux/actions/todoActions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loggedIn = useSelector((state) => state?.auth?.loggedIn || false);
  const userId = useSelector((state) => state?.auth?._id || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(username, password));
    setUsername("");
    setPassword("");
  };
  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchTodos(userId));
    }
  }, [loggedIn, userId, dispatch]);

  return (
    !loggedIn && (
      <div>
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
      </div>
    )
  );
};

export default LoginForm;
