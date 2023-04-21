const initialState = {
  todos: [],
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO_SUCCESS":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "EDIT_TODO_SUCCESS":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo._id === action.payload.todoId
            ? action.payload.updatedTodo
            : todo;
        }),
      };
    case "FETCH_TODO_LIST_SUCCESS":
      return {
        ...state,
        todos: action.payload,
      };
    case "DELETE_TODO_SUCCESS":
      return {
        ...state,
        todos: state.todos?.filter((todo) => todo._id !== action.payload),
      };
    case "LOGOUT":
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

export default todosReducer;
