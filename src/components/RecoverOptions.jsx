import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RecoverOptions.css";

function RecoverOptions() {
  let [option, setOption] = useState("recover");
  let [email, setEmail] = useState("")
  let [emailError, setEmailError] = useState("")
  // let [errorMsg, setErrorMsg] = useState("")
  let [securityAnswer, setSecurityAnswer] = useState("")

  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSecurityAnswerChange = (event) => {
    setSecurityAnswer(event.target.value);
  };

  const clearForm = () => {
    setEmail('')
    setOption('recover')
  }

  const handleRecoveryType = () => {
    setEmailError("");

    let isFormValid = true;
    if (email.trim() === "") {
      setEmailError("Email is required");
      isFormValid = false;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter valid email");
      isFormValid = false;
    }
 
    if (!isFormValid) {
      return false
    }

    return true
  }

  const handleSecurityRecovery = () => {
    axios
    .post('https://edunexa.onrender.com/recover-password/', {
      'email': email,
      'security_answer': securityAnswer
    })
    .then((response) => {
      let {reset_url} = response.data
      if (reset_url !== "") {
        window.location.assign(reset_url) // make a new url landing page for resetting password
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const handleEmailRecovery = () => {
    console.log("hello");
    console.log(email);
    axios
    .post('https://edunexa.onrender.com/email-password/', {
      'email': email,
    })
    .then((response) => {
      let {msg} = response.data
      if (msg === "Verification email sent successfully") {
        console.log("email sent")
      }
    })
    .catch((err) => {
      console.error(err)
    })
    return true
  }

  let toRender;
  if (option === "using-security") {
    toRender = (
      <div className="forgot-pass-page">
        <div className="forgot-pass-container">
          <span onClick={()=>{clearForm()}} className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </span>
          <h1>Security question</h1>
          <label>What is your birth city?</label>
          <span className="required">*</span>
          <input
            type="text"
            id="security-answer"
            placeholder="Enter answer"
            onChange={handleSecurityAnswerChange}
          />
          <button onClick={handleSecurityRecovery}>Recover</button>
        </div>
      </div>
    );
  } else if (option === 'using-email') {
    toRender = (
      <div className="forgot-pass-page">
        <div className="forgot-pass-container">
          <span onClick={()=>{clearForm()}} className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </span>
          <h1>Email</h1>
          <p>
            A recovery link will be sent to your email. Please follow the instructions.
            <br/>
            <br/>
            <Link to={"/"}>Go home</Link>
          </p>
        </div>
      </div>
    )
  } else if (option === 'using-otp') {
    toRender = (
      <div className="forgot-pass-page">
        <div className="forgot-pass-container">
          <span onClick={()=>{clearForm()}} className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </span>
          <h1>OTP</h1>
          <label>Enter otp sent your mobile</label>
          <span className="required">*</span>
          <input
            type="text"
            id="security-otp"
            placeholder="Enter OTP"
          />
          <button>Recover</button>
        </div>
      </div>
    );
  } else {
    toRender = (
      <div className="forgot-pass-page">
        <div className="forgot-pass-container">
          <center>
            <h1>Recover password</h1>
          </center>
          <div className="input-group">
            <label htmlFor="email">What is your email?</label>
            <span className="required">*</span>
            <input
              required
              type="email"
              id="email"
              placeholder="Enter email"
              onChange={handleEmailChange}
            />
            {emailError && (
              <div className="error-message">{emailError}</div>
            )}
          </div>
          <div className="input-group">
          <label>How do you want to recover?</label>
            <div className="recover-options">
              <button onClick={(e)=> {handleRecoveryType() && setOption('using-security')}}>Security question</button>
              <button onClick={(e)=> {handleRecoveryType() && handleEmailRecovery() && setOption('using-email')}}>Email</button>
              {/* <button onClick={(e)=> {handleRecoveryType() && setOption('using-otp')}}>OTP</button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* {errorMsg && (
        <div className="error-message">{errorMsg}</div>
      )} */}
      {toRender}
    </div>
  );
}

export default RecoverOptions;
