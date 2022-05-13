import React, { useState } from 'react';

function SignUp() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const divStyle = {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
    border: "5px solid black"
  };

  const inputStyle = {
    margin: "20px",
    width: "400px"
  };

  const buttonStyle = {
    position: 'relative',
    left: "300px",
    bottom: "5px"
  };



  //style={{color: "red"}}

  return(
    <div className="SignUp" style={divStyle}>
      <h1 style={inputStyle}>Please Sign Up</h1>
      <form>
        <label> 
          <p style={inputStyle}>Username</p>
          <input type="text" style={inputStyle} onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p style={inputStyle}>Password</p>
          <input type="password" style={inputStyle} onChange={e => setPassword(e.target.value)}/>
        </label>
        <div >
          <button type="submit" style={buttonStyle}  >SignUp</button>
        </div>
      </form>
    </div>
  )
}


export default SignUp;