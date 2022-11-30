import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Forgottonpassword } from "./Forgottonpassword";


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
    return (
      <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : currentForm === "Signup" ? <Signup onFormSwitch={toggleForm} /> : <Forgottonpassword onFormSwitch={toggleForm} /> 
      }
      </div>

    )
}

export default App;