/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

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
    <div className="SignUp" style={divStyle}>
      <h1 style={inputStyle}>Sign Up</h1>
      <form>
        <label>
          <p style={inputStyle}>Email</p>
          <input
            type="text"
            style={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
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
            SignUp
          </button>
        </div>
        <p style={inputStyle}>
          Already have an account?{" "}
          <Link to="/"> Log In here
        </Link></p>
      </form>
    </div>
  );
}

export default SignUp;
