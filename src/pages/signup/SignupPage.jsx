import React, { useState } from "react";
import  "./SignupPage.css";
import { Link } from "react-router-dom";
import axios from "axios"

function SignupPage() {
  const [accountCreated, setAccountCreated] = useState(false)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [email,setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [error, setError] = useState("");


  const handleSignup = () => {
    setError(""); 

    // Check if all necessary fields are filled
    if (
      !firstName ||
      !lastName ||
      !password ||
      !passwordRetype ||
      !email ||
      !securityQuestion ||
      !username
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    //check if password contains required characters and special symbols 

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!password.match(passwordRegex)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol');
      return;
    }

    // Check if passwords match
    if (password !== passwordRetype) {
      setError("Passwords do not match.");
      return;
    }

    axios
      .post("https://edunexa.onrender.com/user/", {
        email: email.toString(),
        first_name: firstName.toString(),
        last_name: lastName.toString(),
        username: username.toString(),
        password: password.toString(),
        sec_answer: securityQuestion.toString(), 
      })
      .then((response) => {
        if (response.data.msg === "user created") {
          setAccountCreated(true)
        }
        if (response.status !== 200){
          console.log(response.status.toString)
        }
      })
      .catch((error) => {
        console.error(error)
      });
  };

  return (
    <div>
    { !accountCreated &&
      (<div>
        <div className="Signup-header">
          <Link to="/">
            <span className="title">EduNexa</span>
          </Link>
        </div>
        <div className = 'Sign-Up'>
          <div className="signup-form">
            <h1>Sign Up</h1>
            {error && <div className="error-message">{error}</div>}
            <div>
              <label htmlFor="firstName">First Name</label>
              <span className="required">*</span>
              <input
                type="text"
                id="firstName"
                placeholder= "Enter Your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <span className="required">*</span>
              <input
                type="text"
                id="lastName"
                placeholder= "Enter Your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="userName">Username</label>
              <span className="required">*</span>
              <input
                type="text"
                id="userName"
                placeholder= "Enter Your User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <span className="required">*</span>
              <input
                type="password"
                id="password"
                placeholder= "Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="passwordRetype">Confirm your Password:</label>
              <span className="required">*</span>
              <input
                type="password"
                id="passwordRetype"
                placeholder= "Retype your Password"
                value={passwordRetype}
                onChange={(e) => setPasswordRetype(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <span className="required">*</span>
              <input
                type="email"
                id="email"
                placeholder= "Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="securityQuestion">Security Question: What is your birth City?</label>
              <span className="required">*</span>
              <input
                type="text"
                id="securityQuestion"
                placeholder= "Type your Birth Place"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
              />
            </div>
            <button onClick={handleSignup}>Sign Up</button>
          </div>
        </div>
      </div>)}
    {accountCreated && (
      <div>
        <div className="Signup-header">
        <Link to="/">
          <span className="title">EduNexa</span>
        </Link>
        </div>
        <div className = 'Sign-Up'>
          <div className="signup-form">
            <h1>Account created successfully</h1>
            <Link to={'/'}>Login</Link>
          </div>
        </div>
      </div>
    )}
    </div>
    );
}

export default SignupPage;
