import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LogIn(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/tasks`;
    navigate(path);
  };

  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    props.setUserName(loggedInUser);
    routeChange();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.get(
      "https://task-time-csc307.herokuapp.com/users"
        .concat("?username=")
        .concat(username)
    );
    console.log(response.data.user_list);
    if (response.data.user_list.length === 1) {
      if (password === response.data.user_list[0].password) {
        console.log("Match found!");
        console.log(username);
        props.setUserName(username);
        localStorage.setItem("user", username);
        routeChange();
      } else {
        console.log("Wrong Password");
        setError(true);
      }
    } else {
      console.log("Username not found!");
      setError(true);
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
    left: "335px",
    bottom: "30px"
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
            className={!error ? "" : "error"}
          />
        </label>
        <label>
          <p style={inputStyle}>Password</p>
          <input
            type="password"
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            className={!error ? "" : "error"}
          />
        </label>
        {error && (
          <p style={inputStyle} className="error_msg">
            Username or password incorrect. Please try again.
          </p>
        )}
        <h8 style={inputStyle}>
          Don&apos;t have an account yet? <Link to="SignUp">Sign Up here</Link>
        </h8>
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
