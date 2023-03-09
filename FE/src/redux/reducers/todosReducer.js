const initialState = {
  todos: [],
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO_SUCCESS":
      return {
        ...state,
      };
    case "FETCH_TODO_LIST_SUCCESS":
      return {
        ...state,
        todos: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos?.filter((todo) => todo._id !== action.payload),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos?.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case "LOGOUT":
      return {
        ...state,
        todos:[]
      }
    default:
      return state;
  }
}

export default todosReducer;
