import React, { useState } from "react";
import axios from "axios";
import "../static/css/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:5000/api/auth/register",
        formData
      );
      alert("User registered successfully");
      console.log(res.data);
    } catch (err) {
      alert("Error in registration");
      console.log("ERROR : ", err);
    }
  };

  return (
    <div className="register-page">
      <h1 className="register-title">Registration Form</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <label>Name :</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;