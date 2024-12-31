import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const [isSignIn, setIsSignIn] = useState(location.state?.isSignIn ?? true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [message, setMessage] = useState("");

  // Update isSignIn when location state changes
  useEffect(() => {
    setIsSignIn(location.state?.isSignIn ?? true);
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignIn ? "signin" : "create-account";
      const response = await axios.post(`http://localhost:5000/${endpoint}`, formData);
      setMessage(response.data.message);
      
      // Clear form after successful submission
      if (response.data.success) {
        setFormData({
          email: "",
          password: "",
          username: ""
        });
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred!");
    }
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    // Clear form and message when switching between sign in and register
    setFormData({
      email: "",
      password: "",
      username: ""
    });
    setMessage("");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{isSignIn ? "Sign In" : "Create Account"}</h1>
        <form onSubmit={handleFormSubmit}>
          {!isSignIn && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {isSignIn ? "Sign In" : "Create Account"}
          </button>
        </form>
        <p className="toggle-form">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleForm}>
            {isSignIn ? "Create Account" : "Sign In"}
          </button>
        </p>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
