import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        const response = await axios.post("http://localhost:5000/signin", {
          email,
          password,
        });
        setMessage(response.data.message);
      } else {
        const response = await axios.post("http://localhost:5000/create-account", {
          email,
          password,
          username,
        });
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>{isSignIn ? "Sign In" : "Create Account"}</h1>
      <form onSubmit={handleFormSubmit}>
        {!isSignIn && (
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isSignIn ? "Sign In" : "Create Account"}</button>
      </form>
      <p>
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? "Create Account" : "Sign In"}
        </button>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
