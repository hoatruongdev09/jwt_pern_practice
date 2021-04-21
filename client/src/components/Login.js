import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const body = { email: email, password: password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("response: ", response);
      const parsedResponse = await response.json();
      if (response.status === 200) {
        if (parsedResponse.token) {
          localStorage.setItem("token", parsedResponse.token);
          toast.success("Login successful", {
            hideProgressBar: true,
            pauseOnFocusLoss: false,
          });
          setAuth(true);
        }
      } else {
        toast.error(parsedResponse.message, {
          hideProgressBar: true,
          pauseOnFocusLoss: false,
        });
        setAuth(false);
        return;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={(e) => onSubmitLogin(e)}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Login</button>
      </form>
      <p className="my-3">
        Don't have account? <Link to="/register"> Create new account</Link>
      </p>
    </Fragment>
  );
};

export default Login;
