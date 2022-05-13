import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import MyApp from "./MyApp";

function URLpaths() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/tasks"  element={<MyApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default URLpaths;
