const initialState = {
  _id: "",
  loggedIn: false,
  username: "",
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        _id: action.payload?.user?._id,
        loggedIn: true,
        username: action.payload?.user?.username,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        _id: action.payload?.user?._id,
        loggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        _id: '',
        loggedIn: false,
        username: '',
      }
    default:
      return state;
  }
}

export default authReducer;
