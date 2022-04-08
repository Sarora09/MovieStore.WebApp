import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  // States for input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // States for input field validations
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [serverErr, setServerErr] = useState("");

  useEffect(() => {
    let storageToken = localStorage.getItem('token');
    // let storageId = localStorage.getItem('id')
    if (storageToken) {
      navigate('/profile')
    }
  }, []);

  function validation() {
    email == "" ? setEmailErr("Confirm password is required.") : setEmailErr("");
    password == "" ? setPasswordErr("Password is required.") : setPasswordErr("");
    confirmPassword == "" ? setConfirmPasswordErr("Confirm password is required.") : setConfirmPasswordErr("");

    if (password !== confirmPassword) {
      setPasswordErr("Password and Confirm Password doesn't match");
      setConfirmPasswordErr("Password and Confirm Password doesn't match");
    }
  }

  // using this login function to extract the JWT key which is required for authorization
  // Without the JWT key, the backend (.Net) will not allow the user to access the movie resource
  const login = async () => {
    // server returns response with code and body containing the login jwt string
    var result = await fetch("https://movie-collection-api-app.azurewebsites.net/api/access/login", {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // extracting the jwt authorization key from the server response when it is 200 server response code
    if (result.status == 200) {
      // extracting the readable stream from the response and using the getReader() read property. It returns a Unit8Array() value
      var defaultEncodedTokenValue = await result.body.getReader().read();

      // decoding the Unit8Array() value to string
      var decodedValue = new TextDecoder().decode(defaultEncodedTokenValue.value);

      localStorage.setItem('token', decodedValue);

      navigate('/profile');

    }
  }

  const submitData = async (e) => {
    e.preventDefault();
    validation();
    if (emailErr == "" && passwordErr == "" && confirmPasswordErr == "") {
      var result = await fetch("https://movie-collection-api-app.azurewebsites.net/api/access", {
        method: 'post',
        body: JSON.stringify({ email, password, confirmPassword }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // extracting the readable stream from the response and using the getReader() read property. It returns a Unit8Array() value
      var defaultEncodedValue = await result.body.getReader().read();

      // decoding the Unit8Array() value to string
      var decodedValue = new TextDecoder().decode(defaultEncodedValue.value);

      if (result.status == 200) {
        var newUserId = decodedValue;
        localStorage.setItem('userId', newUserId);
        localStorage.setItem('email', email);
        login();
      }
      else {
        if (result.status == 401) {
          var receivedError = JSON.parse(decodedValue);

          var errorList = receivedError.map((element) => {
            return element.description;
          });
          setServerErr(errorList);
        }
      }
    }

  }

  return (
    <div className="movie-login-background">
      <div className="signup container">
        {
          serverErr && <div className="server-validation">
            <h3>Server Error(s)</h3>
            {serverErr.map((error, index) => {
              return <p key={index}>{index + 1}). {error}</p>
            })}
          </div>
        }
        <h1>Signup</h1>
        <form onSubmit={submitData} className="signup-form">

          <label>Username</label>
          <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          {emailErr && <p className="signup-validation">{emailErr}</p>}

          <label>Password</label>
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          {passwordErr && <p className="signup-validation">{passwordErr}</p>}

          <label>Confirm Password</label>
          <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
          {confirmPasswordErr && <p className="signup-validation">{confirmPasswordErr}</p>}

          <button type="submit">Signup</button>
        </form>

      </div>
    </div>
  );
};

export default Signup;
