export const fetchTodos = (userId) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    userId:userId,
  };
  return (dispatch) => {
    dispatch({ type: "FETCH_TODO_LIST_PENDING" });
    fetch(`http://localhost:4000/todos/${userId}`, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "FETCH_TODO_LIST_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_TODO_LIST_FAILURE", payload: error.message });
      });
  };
};

export const addTodo = (todo) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  };
  return (dispatch) => {
    dispatch({ type: "ADD_TODO_PENDING" });
    fetch(`http://localhost:4000/addTodo`, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchTodos(todo.userId));
        dispatch({
          type: "ADD_TODO_SUCCESS",
          payload: { data: data, _id: todo._id },
        });
      })
      .catch((error) => {
        dispatch({ type: "ADD_TODO_FAILURE", payload: error.message });
      });
  };
};

export const deleteTodo = (todoId, userId) => {
  const options = {
    method: "DELETE",
  };
  return (dispatch) => {
    dispatch({ type: "DELETE_TODO_PENDING" });
    fetch(`http://localhost:4000/deleteTodo/${todoId}`, options)
      .then((response) => response.json())
      .then(() => {
        dispatch(fetchTodos(userId));
        const userData = { username: 'jdoe', email: 'jdoe@example.com' };
        localStorage.setItem('userData', JSON.stringify(userData));
        dispatch({ type: "DELETE_TODO_SUCCESS", payload: todoId });
      })
      .catch((error) => {
        dispatch({ type: "DELETE_TODO_FAILURE", payload: error.message });
      });
  };
};

export const editTodo = (todoId, updatedTodo) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTodo),
  };
  return (dispatch) => {
    dispatch({ type: "EDIT_TODO_PENDING" });
    fetch(`http://localhost:4000/editTodo/${todoId}`, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchTodos(updatedTodo.userId));
        dispatch({
          type: "EDIT_TODO_SUCCESS",
          payload: { data: data, _id: todoId },
        });
      })
      .catch((error) => {
        dispatch({ type: "EDIT_TODO_FAILURE", payload: error.message });
      });
  };
};
