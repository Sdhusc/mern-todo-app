import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;