import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { login, logout } from "../redux/actions/authAction";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

import "./MainPage.css";
const MainPage = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state?.auth?.loggedIn || false);
  const handleLogout = () => {
    dispatch(logout());
  };
  const authToken = JSON.parse(localStorage.getItem('authToken'));
  if (authToken) {
    if(!loggedIn)
    dispatch(login(authToken.username, authToken.password))
  }
  const authItems = (
    <div>
        <SignUpForm />
        <LoginForm />
    </div>
  )
   const todoItems = (
     <div>
       <TodoList />
        <AddTodo />
     </div>
   )
  
  return (
    <div>
      <header>
        <h1>Todo App</h1>
        <nav>
          <button onClick={handleLogout}>Logout
          </button>
        </nav>
      </header>
      <main>
        {!loggedIn && authItems }
        {loggedIn && todoItems}
      </main>
    </div>
  );
};


export default MainPage;


