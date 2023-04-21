import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";
import "./AddTodo.css";

import AddTodoModal from "./AddTodoModal";

const AddTodo = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?._id || "");
  const [showForm, setShowForm] = useState(false);
  const loggedIn = useSelector((state) => state?.auth?.loggedIn || false);
  const handleSubmit = (event) => {
    event.userId = userId;
    dispatch(addTodo(event));
  };
  return (
    loggedIn && (
      <div className="add-todo-container">
        <button
          className="add-todo-title"
          onClick={() => setShowForm(!showForm)}>
          {" "}
          {showForm ? "Cancel Add" : "Add New Todo"}
        </button>
        {showForm && (
          <AddTodoModal
            showEditForm={showForm}
            handleSubmit={handleSubmit}
            setShowEditForm={setShowForm}
          />
        )}
      </div>
    )
  );
};

export default AddTodo;
