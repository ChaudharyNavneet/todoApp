import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, deleteTodo, editTodo } from "../redux/actions/todoActions";
import "./TodoList.css";
import AddTodoModal from "./AddTodoModal";

const TodoList = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?._id || "");
  const todos = useSelector((state) => state?.todos);
  const loggedIn = useSelector((state) => state?.auth?.loggedIn || false);

  useEffect(() => {
    if (loggedIn) dispatch(fetchTodos(userId));
  }, [loggedIn, dispatch, userId]);

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId, userId));
  };

  const [showEditForm, setShowEditForm] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState("");
  const [targetTodo, setTargetTodo] = useState({});

  const handleEdit = (todoId) => {
    const currentTodo = todos.todos.find((todo) => todo._id === todoId);
    setTargetTodo(currentTodo);
    setShowEditForm(true);
    setCurrentTodoId(todoId);
  };

  const handleSubmit = (updatedTodo) => {
    updatedTodo._id = currentTodoId;
    updatedTodo.userId = userId;
    dispatch(editTodo(currentTodoId, updatedTodo));
    setShowEditForm(false);
  };

  function TodoItem({ todo, handleDelete, handleEdit }) {
    return (
      <li key={todo._id} className="todo-item">
        <h4 style={{ width: "150px", margin: "5px" }}>{todo.title}</h4>
        <p style={{ width: "400px", margin: "5px" }}>{todo.description}</p>
        <p style={{ width: "200px", margin: "5px" }}>
          {todo.completed ? "Done" : "Pending"}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBlock: "5px",
          }}>
          <button onClick={() => handleDelete(todo._id)}>Delete</button>
          <button onClick={() => handleEdit(todo._id)}>Edit</button>
        </div>
      </li>
    );
  }

  function TodoList({ todos, handleDelete, handleEdit }) {
    todos = todos.todos;
    const today = new Date();
    const weekFromToday = new Date();
    weekFromToday.setDate(today.getDate() + 7);

    const overDue = [];
    const dueToday = [];
    const dueThisWeek = [];
    const dueLater = [];

    todos.forEach((todo) => {
      const dueDate = new Date(todo.dueDate);
      if (dueDate - today < 0 && dueDate.getDate() < today.getDate()) {
        overDue.push(todo);
      } else if (
        dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth()
      ) {
        dueToday.push(todo);
      } else if (dueDate > today && dueDate < weekFromToday) {
        dueThisWeek.push(todo);
      } else {
        dueLater.push(todo);
      }
    });
    return (
      <div>
        <div style={{ display: "flex" }}>
          <ul>
            <h3 style={{ textAlign: "center" }}>
              {" "}
              {overDue.length ? `Overdue: ${overDue.length} items` : ""}{" "}
            </h3>
            {overDue.map((todo) => (
              <TodoItem
                todo={todo}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </ul>
          <ul>
            <h3 style={{ textAlign: "center" }}>
              {" "}
              {dueToday.length
                ? `Due Today: ${dueToday.length} items`
                : ""}{" "}
            </h3>
            {dueToday.map((todo) => (
              <TodoItem
                todo={todo}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </ul>
        </div>
        <div style={{ display: "flex" }}>
          <ul>
            <h3 style={{ textAlign: "center" }}>
              {" "}
              {dueThisWeek.length
                ? `Due This Week: ${dueThisWeek.length} items`
                : ""}{" "}
            </h3>
            {dueThisWeek.map((todo) => (
              <TodoItem
                todo={todo}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </ul>
          <ul>
            <h3 style={{ textAlign: "center" }}>
              {" "}
              {dueLater.length
                ? `Due Later: ${dueLater.length} items`
                : ""}{" "}
            </h3>
            {dueLater.map((todo) => (
              <TodoItem
                todo={todo}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return loggedIn ? (
    <div className="todo-list">
      {showEditForm && (
        <AddTodoModal
          showEditForm={showEditForm}
          handleSubmit={handleSubmit}
          setShowEditForm={setShowEditForm}
          defaultValus={targetTodo}
        />
      )}
      <h2>Todo List</h2>
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  ) : (
    <h2>LogIn First to see your TODOs</h2>
  );
};

export default TodoList;
