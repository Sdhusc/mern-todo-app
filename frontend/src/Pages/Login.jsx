import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../static/css/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user1));

      window.dispatchEvent(new Event("userChanged"));

      alert("Login successful");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.log("error : ", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="login-page">
      <h1 className="login-title">Login</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <label>Password :</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;