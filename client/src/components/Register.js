import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      const parsedResponse = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", parsedResponse.token);
        setAuth(true);
        toast.success("Register Successful", {
          pauseOnFocusLoss: false,
          hideProgressBar: true,
        });
      } else {
        toast.error(parsedResponse.message, {
          pauseOnFocusLoss: false,
          hideProgressBar: true,
        });
      }
      console.log("parse: ", parsedResponse);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={(e) => onSubmitRegister(e)}>
        <input
          type="email"
          name="email"
          className="form-control my-3"
          placeholder="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          className="form-control my-3"
          placeholder="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="name"
          className="form-control my-3"
          placeholder="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <p className="my-3">
        Already have account? <Link to="/login"> Login</Link>
      </p>
    </Fragment>
  );
};

export default Register;
