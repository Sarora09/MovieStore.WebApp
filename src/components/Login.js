import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const navigate = useNavigate();

  // To avoid the user from coming to login button when the user is already logged in
  // Implemented using the localstorage. The token value is saved in localstorage when user logged in.
  useEffect(() => {
    let storageToken = localStorage.getItem('token');
    if (storageToken != null) {
      return navigate('/profile');
    }
  }, []);

  function validation() {
    email == "" ? setEmailErr("Username is required.") : setEmailErr("");
    password == "" ? setPassErr("Password is required.") : setPassErr("");
  }

  const submitData = async (e) => {

    e.preventDefault();
    validation();
    if (email !== "" && password !== "") {

      setLoadingMessage("Please wait. Loading...")

      // server returns response with code and body containing the login jwt string
      var result = await fetch("https://movie-collection-api-app.azurewebsites.net/api/access/login", {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // displaying credential error for 401 server response code
      if (result.status == 401) {
        setLoadingMessage("");
        setEmail("");
        setPassword("");
        setEmailErr("Incorrect Login Credentials. Please try again.");
        setPassErr("Incorrect Login Credentials. Please try again.");
      }
      else {
        // extracting the jwt authorization key from the server response when it is 200 server response code
        if (result.status == 200) {
          // extracting the readable stream from the response and using the getReader() read property. It returns a Unit8Array() value
          var defaultEncodedTokenValue = await result.body.getReader().read();

          // decoding the Unit8Array() value to string
          var decodedValue = new TextDecoder().decode(defaultEncodedTokenValue.value);

          localStorage.setItem('token', decodedValue);

          // I am sending the email and fetching the user id only so it will return me the id
          var loginUserResult = await fetch(`https://movie-collection-api-app.azurewebsites.net/api/access/email/${email}`);

          // because I am getting the id only I am not using .json but only the bodyreader
          var defaultEncodedIdValue = await loginUserResult.body.getReader().read();

          // decoding the Unit8Array() value to string
          var decodedIdValue = new TextDecoder().decode(defaultEncodedIdValue.value);
          localStorage.setItem('userId', decodedIdValue);

          // console.log(decodedIdValue);

          navigate('/profile');

        }
      }
    }

  }

  return (
    <div className="movie-login-background">
      <div className="movie-login container">
        <h1>Login</h1>

        <form onSubmit={submitData} className="movie-login-form">

          {loadingMessage && <h2 className="loading-message">{loadingMessage}</h2>}

          <label>Username</label>
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailErr && <p className="login-validation">{emailErr}</p>}

          <label>Password</label>
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {passErr && <p className="login-validation">{passErr}</p>}

          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  );
};

export default Login;
