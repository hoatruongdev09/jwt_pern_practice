import React, { Fragment, useState, useEffect } from "react";

import "./App.css";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
toast.configure();
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.getItem("token") },
      });
      const parsedResponse = await response.json();
      setAuth(parsedResponse === true);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    isAuth();
  }, []);
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login {...props} setAuth={setAuth} />
                )
              }
            ></Route>
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
