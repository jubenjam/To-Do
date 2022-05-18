import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import MyApp from "./MyApp";

function URLpaths() {
  const [username, setUserName] = useState("");

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LogIn setUserName={setUserName} />} />
          <Route path="/SignUp" element={<SignUp setUserName={setUserName} />} />
          <Route path="/tasks" element={<MyApp username={username} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default URLpaths;
