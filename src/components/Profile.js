import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  // States for input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [age, setAge] = useState(18);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonStatus, setButtonStatus] = useState("Register Profile");
  const navigate = useNavigate();

  // States for input field validations
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [creditCardErr, setCreditCardErr] = useState("");
  const [ageErr, setAgeErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [serverErr, setServerErr] = useState("");

  // Profile loading if the user is an existing user
  useEffect(async () => {
    let userId = localStorage.getItem('userId');
    var userEmail = localStorage.getItem('email');
    if (userId != "") {
      var result = await fetch(`https://movie-collection-api-app.azurewebsites.net/api/access/${userId}`);
      var userDetails = await result.json();
      userDetails.firstName !== null ? setFirstName(userDetails.firstName) : setFirstName("");
      userDetails.lastName != null ? setLastName(userDetails.lastName) : setLastName("");
      userDetails.email !== "" ? setEmail(userDetails.email) : setEmail(userEmail);
      userDetails.creditCard !== null ? setCreditCard(userDetails.creditCard) : setCreditCard("");
      userDetails.age == 0 ? setAge(18) : setAge(userDetails.age);
      // for existing users, the button text will change to update profile
      if (userDetails.firstName && userDetails.lastName && userDetails.email && userDetails.creditCard && userDetails.age) {
        setButtonStatus("Update Profile");
      }
    }
  }, []);

  // The server validation errors are customized for better understanding
  const updateData = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && creditCard && age && password && confirmPassword) {
      let newUserId = localStorage.getItem('userId');
      var result = await fetch(`https://movie-collection-api-app.azurewebsites.net/api/access/${newUserId}`,
        {
          method: 'put',
          body: JSON.stringify({ firstName, lastName, email, creditCard, age, password, confirmPassword }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      // extracting the readable stream from the response and using the getReader() read property. It returns a Unit8Array() value
      var defaultEncodedValue = await result.body.getReader().read();

      // decoding the Unit8Array() value to string
      var decodedValue = new TextDecoder().decode(defaultEncodedValue.value);

      if (result.status == 200) {
        navigate('/moviedashboard', { state: { 'email': email } })
      }
      else if (result.status == 500) {
        setConfirmPasswordErr("");
        setCreditCardErr("");
        setFirstNameErr("");
        setAgeErr("");
        setLastNameErr("");
        setPasswordErr("");

        var receivedError = JSON.parse(decodedValue);

        var errorList = receivedError.map((element) => {
          return element.description;
        });
        setServerErr(errorList);
      }
      else if (result.status == 400) {
        setServerErr("");
        var receivedError = JSON.parse(decodedValue).errors;
        receivedError.ConfirmPassword ? setConfirmPasswordErr('Confirm Password is required and shall match with Password field.') : setConfirmPasswordErr("");
        receivedError.CreditCard ? setCreditCardErr("Credit Card is required") : setCreditCardErr("");
        receivedError.FirstName ? setFirstNameErr("First Name is required") : setFirstNameErr("");
        receivedError.age ? setAgeErr("Age is required") : setAgeErr("");
        receivedError.LastName ? setLastNameErr("Last name is required") : setLastNameErr("");
        receivedError.Password ? setPasswordErr("Password is required for any profile update and shall match with ConfirmPassword field.") : setPasswordErr("");

      }
    }
    else {
      setServerErr("");
      confirmPassword == "" ? setConfirmPasswordErr('Confirm Password is required and shall match with Password field.') : setConfirmPasswordErr("");
      creditCard == "" ? setCreditCardErr("Credit Card is required") : setCreditCardErr("");
      firstName == "" ? setFirstNameErr("First Name is required") : setFirstNameErr("");
      age == 0 ? setAgeErr("Age is required") : setAgeErr("");
      lastName == "" ? setLastNameErr("Last name is required") : setLastNameErr("");
      password == "" ? setPasswordErr("Password is required for any profile update and shall match with ConfirmPassword field.") : setPasswordErr("");
    }
  }

  return (
    <div className="movie-login-background">
      <div className="profile container">
        {
          serverErr && <div className="server-validation">
            <h3>Server Error(s)</h3>
            {serverErr.map((error, index) => {
              return <p key={index}>{index + 1}). {error}</p>
            })}
          </div>
        }
        <h1>My profile</h1>
        <form onSubmit={updateData} className="profile-form">
          <div className="profile-form-container">
            <div className="profile-form-sub-container">
              <div className="profile-one">
                <label>First Name</label>
                <input type="text" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                {firstNameErr && <p className="profile-validation">{firstNameErr}</p>}

                <label>LastName</label>
                <input type="text" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                {lastNameErr && <p className="profile-validation">{lastNameErr}</p>}

                <label>Email</label>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailErr && <p className="profile-validation">{emailErr}</p>}

                <label>Credit Card</label>
                <input type="text" placeholder="credit card" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} />
                {creditCardErr && <p className="profile-validation">{creditCardErr}</p>}
              </div>

              <div className="profile-two">


                <label>Age</label>
                <input type="number" placeholder="age" min={18} value={age} onChange={(e) => setAge(e.target.value)} />
                {ageErr && <p className="profile-validation">{ageErr}</p>}

                <label>Password</label>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                {passwordErr && <p className="profile-validation">{passwordErr}</p>}

                <label>Confirm Password</label>
                <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                {confirmPasswordErr && <p className="profile-validation">{confirmPasswordErr}</p>}
              </div>
            </div>

            <button type="submit">{buttonStatus}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
