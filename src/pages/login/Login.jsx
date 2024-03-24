import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import "./Login.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

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


    function setUserData(userData) {
      // Set user data to local storage
      localStorage.setItem('userData', JSON.stringify(userData));
      // Set additional fields to local storage
      localStorage.setItem('email', userData.email);
      localStorage.setItem('first_name', userData.first_name);
      localStorage.setItem('id', userData.id);
      localStorage.setItem('last_name', userData.last_name);
      localStorage.setItem('password', userData.password);
      localStorage.setItem('sec_answer', userData.sec_answer);
      localStorage.setItem('user_role', userData.user_role);
      setUserRole(userData.user_role);
      localStorage.setItem('username', userData.username);
  
      // Set user data to state (optional)
      console.log(userData.id);
      console.log(userData.username);
  }

      
  axios.post("https://edunexa.onrender.com/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.access; // Assuming 'access' contains the JWT token
          localStorage.setItem("token", token)
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.user_id; // Assuming 'user_id' is included in the JWT payload
          localStorage.setItem("userId", userId);

          // Call the function to fetch user data and set it to local storage
          fetchUserData(token);

          if (userRole == "Student") {
            navigate("/dashboard");
          }
          else if (userRole == "Instructor"){
            navigate("/dashboardInstructor");
          }
          else if (userRole == "Admin"){
            navigate("/dashboardAdmin");
          }
          
        } 
        else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        alert("Incorrect credentials");
      });

    // Function to fetch user data and set it to local storage
    async function fetchUserData(token) {
      axios.interceptors.request.use(
        (config) => {
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          config.withCredentials = true; // Include credentials in the request
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      const storedUserId = localStorage.getItem("userId");
      console.log(storedUserId);
      if (storedUserId) {
        try {
          const url = `https://edunexa.onrender.com/users/?user_id=${storedUserId}`;
          const result = await axios.get(url);
          setUserData(result.data); // Assuming response.data contains user data
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      }
    }
  }



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
