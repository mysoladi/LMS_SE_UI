import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    setUsernameError("");
    setPasswordError("");

    let isFormValid = true;
    if (username.trim() === "") {
      setUsernameError("Username is required");
      isFormValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    axios
      .post("https://edunexa.onrender.com/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        // let { access_token } = response.data["access"];
      })
      .catch((error) => {
        alert("Incorrect credentials");
      });
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h1>Login in to your account</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <span className="required">*</span>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && (
            <div className="error-message">{usernameError}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <span className="required">*</span>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
        </div>
        <div className="actions">
          <button className="login" onClick={handleLogin}>
            Login
          </button>
        </div>
        <hr></hr>
        <Link to="/forgot-password" id="forgot-password">
          Forgot password?
        </Link>
        <p>
          <span className="signup-msg">Don't have an account? </span>
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
