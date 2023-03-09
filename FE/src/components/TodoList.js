import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, deleteTodo, editTodo } from "../redux/actions/todoActions";

import "./TodoList.css"

const TodoList = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?._id || "");
  const todos = useSelector((state) => state?.todos);
  const loggedIn = useSelector((state) => state?.auth?.loggedIn || false);

  useEffect(() => {
    if(loggedIn)
    dispatch(fetchTodos(userId));
  }, [loggedIn, dispatch, userId]);

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId, userId));
  };

  const [showEditForm, setShowEditForm] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState("");

  const handleEdit = (todoId) => {
    setShowEditForm(true);
    const currentTodo = todos.todos.find((todo) => todo._id === todoId);
    setCurrentTodoId(todoId);
    setEditTitle(currentTodo.title);
    setEditDescription(currentTodo.description);
    setEditCompleted(currentTodo.completed);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTodo = {
      _id: currentTodoId,
      title: editTitle,
      description: editDescription,
      completed: editCompleted,
      userId: userId
    };
    dispatch(editTodo(currentTodoId, updatedTodo));
    setShowEditForm(false);
  };

  return loggedIn ? (
    <div className="todo-list">
    {showEditForm && (
      <div className="todo-edit-form">
        <h3>Edit this Todo</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
            />
            <br />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={editDescription}
              onChange={(event) => setEditDescription(event.target.value)}
            ></textarea>
            <br />
            
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <label htmlFor="completed" style={{ display: 'inline-block' }}>Completed:</label>
            <input
              type="checkbox"
              id="completed"
              checked={editCompleted}
              onChange={(event) => setEditCompleted(event.target.checked)}
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
            </div>
            <br />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
      <h2>Todo List</h2>
    <ul>
      {todos.todos.map((todo) => (
        <li key={todo._id} className="todo-item"  >
          <h4 style={{ width: '150px', margin: "5px" }}>{todo.title}</h4>
          <p style={{ width: '400px' , margin: "5px" }}>{todo.description}</p>
          <p style={{ width: '200px' , margin: "5px" }}>{todo.completed ? 'Done' : 'Pending'}</p>
          <div style={{display: 'flex', flexDirection: 'column', marginBlock : '5px'}}>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
            <button onClick={() => handleEdit(todo._id)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
) : (
  <h2>LogIn First to see your TODOs</h2>
);
};

export default TodoList;
