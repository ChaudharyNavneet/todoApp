export const login = (username, password) => {
  const authToken = {
    username: username,
    password: password,
  }
  return (dispatch) => {
    dispatch({ type: "LOGIN_PENDING" });
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('authToken',JSON.stringify(authToken));
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      });
  };
};

export const signUp = (username, password) => {
  const authToken = {
    username: username,
    password: password,
  }
  return (dispatch) => {
    dispatch({ type: "SIGNUP_PENDING" });
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('authToken',JSON.stringify(authToken));
        dispatch({ type: "SIGNUP_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "SIGNUP_FAILURE", payload: error.message });
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem('authToken');
    // Clear state here 
  };
};

