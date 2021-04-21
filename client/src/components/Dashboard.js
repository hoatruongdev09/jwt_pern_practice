import React, { Fragment, useState, useEffect } from "react";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const parsedResponse = await response.json();
      setName(parsedResponse.user_name);
      console.log(parsedResponse);
    } catch (error) {
      console.log("getname: ", error);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h3>Welcome {name}</h3>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
