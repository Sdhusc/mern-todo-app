import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../static/css/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
    };

    checkUser();

    window.addEventListener("userChanged", checkUser);

    return () => {
      window.removeEventListener("userChanged", checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.dispatchEvent(new Event("userChanged"));

    navigate("/login");
  };

  return (
    <nav className="navbar">
      
      <h2
        className="logo"
        onClick={() => navigate(user ? "/dashboard" : "/")}
      >
        ToDo App
      </h2>

      {user ? (
        <div className="nav-right">
          
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>

          <button onClick={handleLogout} className="nav-btn">
            Logout ({user?.name})
          </button>

        </div>
      ) : (
        <div className="nav-right">
          <Link to="/login" className="nav-link">
            Login
          </Link>

          <Link to="/" className="nav-link">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;