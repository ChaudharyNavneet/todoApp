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
  const [editDueDate, SetEditDueDate] = useState('');

  const handleEdit = (todoId) => {
    setShowEditForm(true);
    const currentTodo = todos.todos.find((todo) => todo._id === todoId);
    setCurrentTodoId(todoId);
    setEditTitle(currentTodo.title);
    setEditDescription(currentTodo.description);
    setEditCompleted(currentTodo.completed);
    SetEditDueDate(currentTodo.dueDate)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTodo = {
      _id: currentTodoId,
      title: editTitle,
      description: editDescription,
      completed: editCompleted,
      dueDate: editDueDate,
      userId: userId
    };
    dispatch(editTodo(currentTodoId, updatedTodo));
    setShowEditForm(false);
  };

  function TodoItem({ todo, handleDelete, handleEdit }) {
    return (
      <li key={todo._id} className="todo-item">
        <h4 style={{ width: '150px', margin: "5px" }}>{todo.title}</h4>
        <p style={{ width: '400px' , margin: "5px" }}>{todo.description}</p>
        <p style={{ width: '200px' , margin: "5px" }}>{todo.completed ? 'Done' : 'Pending'}</p>
        <div style={{display: 'flex', flexDirection: 'column', marginBlock : '5px'}}>
          <button onClick={() => handleDelete(todo._id)}>Delete</button>
          <button onClick={() => handleEdit(todo._id)}>Edit</button>
        </div>
      </li>
    );
  }

  function TodoList({ todos, handleDelete, handleEdit }) {
    todos= todos.todos
    const today = new Date();
    const weekFromToday = new Date();
    weekFromToday.setDate(today.getDate() + 7);

    const overDue = todos.filter(todo => new Date(todo.dueDate).getDate() < today.getDate());
    const dueToday = todos.filter(todo => new Date(todo.dueDate).getDate() === today.getDate());
    const dueThisWeek = todos.filter(todo => new Date(todo.dueDate).getDate() > today.getDate() && new Date(todo.dueDate).getDate() < weekFromToday.getDate());
    const dueLater = todos.filter(todo => new Date(todo.dueDate) > weekFromToday);
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <ul>
            <h3 style={{ textAlign: 'center' }}> { overDue.length ? 'Overdue:': ''} </h3>
            {overDue.map(todo => <TodoItem todo={todo} handleDelete={handleDelete} handleEdit={handleEdit} />)}
          </ul>
          <ul>
            <h3 style={{ textAlign: 'center' }}> { dueToday.length ? 'Due Today:': ''} </h3>
            {dueToday.map(todo => <TodoItem  todo={todo} handleDelete={handleDelete} handleEdit={handleEdit} />)}
          </ul>
        </div>
        <div style={{ display: 'flex' }}>
          <ul>
            <h3 style={{ textAlign: 'center' }}> { dueThisWeek.length ? 'Due This Week:': ''} </h3>
            {dueThisWeek.map(todo => <TodoItem todo={todo} handleDelete={handleDelete} handleEdit={handleEdit} />)}
          </ul>
          <ul>
            <h3 style={{ textAlign: 'center' }}> { dueLater.length ? 'Due Later:': ''} </h3>
            {dueLater.map(todo => <TodoItem todo={todo} handleDelete={handleDelete} handleEdit={handleEdit} />)}
          </ul>
        </div>
      </div>




    );
  }

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
              <label htmlFor="completed" style={{ display: 'inline-block', alignItems: "center" }}>Completed:</label>
            <input
              type="checkbox"
              id="completed"
              checked={editCompleted}
              onChange={(event) => setEditCompleted(event.target.checked)}
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
            </div>
            <br />
            <div className="add-todo-input-container" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label htmlFor="date-input">Choose a date:</label>
              <input type="date" id="date-input" value={editDueDate} onChange={(e)=>SetEditDueDate(e.target.value)} />
            </div>
            <br />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
      <h2>Todo List</h2>
    < TodoList todos={todos} handleDelete={handleDelete} handleEdit={handleEdit} />
  </div>
) : (
  <h2>LogIn First to see your TODOs</h2>
);
};

export default TodoList;
