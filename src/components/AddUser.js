import React, { useState } from 'react';

const AddUser = () => {

  // States for input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [age, setAge] = useState(18);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addResult, setAddResult] = useState("");
  const [buttonStatus, setButtonStatus] = useState("Register Profile");

  // States for input field validations
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [creditCardErr, setCreditCardErr] = useState("");
  const [ageErr, setAgeErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [serverErr, setServerErr] = useState("");

  const submitUser = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    var postResult = await fetch(`https://movie-collection-api-app.azurewebsites.net/api/access`,
      {
        method: 'post',
        body: JSON.stringify({ firstName, lastName, email, creditCard, age, password, confirmPassword }),
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
    if (postResult.status == 200) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setCreditCard("");
      setAge("");
      setPassword("");
      setConfirmPassword("");
      setAddResult("User added.");
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
        {addResult && <p className="update-success">{addResult}</p>}
        <h1>My profile</h1>
        <form onSubmit={submitUser} className="profile-form">
          <div className="profile-form-container">
            <div className="profile-form-sub-container">
              <div className="profile-one">
                <label>First Name</label>
                <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                {firstNameErr && <p className="profile-validation">{firstNameErr}</p>}

                <label>LastName</label>
                <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                {lastNameErr && <p className="profile-validation">{lastNameErr}</p>}

                <label>Email</label>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailErr && <p className="profile-validation">{emailErr}</p>}

                <label>Credit Card</label>
                <input type="text" placeholder="Credit card" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} />
                {creditCardErr && <p className="profile-validation">{creditCardErr}</p>}
              </div>

              <div className="profile-two">


                <label>Age</label>
                <input type="number" placeholder="age" min={18} value={age} onChange={(e) => setAge(e.target.value)} />
                {ageErr && <p className="profile-validation">{ageErr}</p>}

                <label>Password</label>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordErr && <p className="profile-validation">{passwordErr}</p>}

                <label>Confirm Password</label>
                <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {confirmPasswordErr && <p className="profile-validation">{confirmPasswordErr}</p>}
              </div>
            </div>

            <button type="submit">{buttonStatus}</button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default AddUser;