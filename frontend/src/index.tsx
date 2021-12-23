import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App";
import Login from "./Login";
import Signup from "./Signup";

ReactDOM.render(
  <React.StrictMode>
    <div className="font-sans">
      <Login />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
