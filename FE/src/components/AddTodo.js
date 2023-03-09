import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";
import "./AddTodo.css"

const AddTodo = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?._id || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false)
  const [completed, setEditCompleted] = useState(false);
  const loggedIn = useSelector((state) => state?.auth?.loggedIn || false);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTodo({ userId, title, completed, description }));
    setTitle("");
    setDescription("");
  };
  const todoForm = (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="add-todo-input-container">
        <label htmlFor="title" className="add-todo-label">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="add-todo-input"
        />
      </div>
      <div className="add-todo-input-container">
        <label htmlFor="description" className="add-todo-label">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="add-todo-input"
        ></textarea>
      </div>
      <div className="add-todo-input-container" style={{display: 'flex', flexDirection: 'row'}}>
        <label htmlFor="completed" className="add-todo-label">Completed:</label>
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(event) => setEditCompleted(event.target.checked)}
          className="add-todo-input-checkbox"
        />
      </div>
      <button type="submit" className="add-todo-button">Add Todo</button>
    </form>
  )

  return (
    loggedIn && (
      <div className="add-todo-container">
        <button className="add-todo-title" onClick={() => setShowForm(!showForm)}> {showForm? 'Cancel Add' : 'Add New Todo' }</button>
        {showForm && todoForm}
      </div>
    )
  );
};

export default AddTodo;
