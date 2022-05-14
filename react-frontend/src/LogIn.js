import React, { useState } from "react";
import axios from "axios";

function LogIn() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  //localhost:5005/users/?username=dustint121&password=121498765aA
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.get(
      "http://localhost:5005/users".concat("?username=").concat(username)
    );
    console.log(response.data.user_list);
    if (response.data.user_list.length === 1) {
      if (response.data.user_list[0].password === password) {
        console.log("Match found!");
      } else {
        console.log("Wrong Password");
      }
    } else {
      console.log("Username not found!");
    }
  }

  const divStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: "5px solid black"
  };

  const inputStyle = {
    margin: "20px",
    width: "400px"
  };

  const buttonStyle = {
    position: "relative",
    left: "300px",
    bottom: "5px"
  };

  //style={{color: "red"}}

  return (
    <div className="Log In" style={divStyle}>
      <h1 style={inputStyle}>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p style={inputStyle}>Username</p>
          <input
            type="text"
            style={inputStyle}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <p style={inputStyle}>Password</p>
          <input
            type="password"
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
