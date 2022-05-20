import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/tasks`;
    navigate(path);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.get(
      "http://localhost:5005/users".concat("?username=").concat(username)
    );
    console.log(response.data.user_list);
    if (response.data.user_list.length === 1) {
      if (password === response.data.user_list[0].password) {
        console.log("Match found!");
        // console.log(username);
        // props.setUserName(username);
        // routeChange();
      } else {
        console.log("Wrong Password");
      }
    } else {
      console.log("Username not found!");
      const person = { username: username, password: password };
      console.log(person);
      addNewUser(person);
      props.setUserName(username);
      routeChange();
    }
  }

  async function addNewUser(person) {
    try {
      const response = await axios.post("http://localhost:5005/users", person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
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
    <div className="SignUp" style={divStyle}>
      <h1 style={inputStyle}>Please Sign Up</h1>
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
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
