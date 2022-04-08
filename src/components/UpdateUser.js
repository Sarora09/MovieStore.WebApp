import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {

    // States for input field
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [age, setAge] = useState(18);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [buttonStatus, setButtonStatus] = useState("Update Profile");
    const [updateResult, setUpdateResult] = useState("");
    const params = useParams();

    // States for input field validations
    const [firstNameErr, setFirstNameErr] = useState("");
    const [lastNameErr, setLastNameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [creditCardErr, setCreditCardErr] = useState("");
    const [ageErr, setAgeErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
    const [serverErr, setServerErr] = useState("");

    useEffect(async () => {
        var userId = params.id;
        var token = localStorage.getItem('token');
        var userResult = await fetch(`https://movie-collection-api-app.azurewebsites.net/api/access/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        var user = await userResult.json();
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setCreditCard(user.creditCard);
            setAge(user.age);
        }
    }, []);

    // To clear the validation errors with state change once the user provided the value for the state
    useEffect(() => {
        if (firstName) {
            setFirstNameErr("");
        }
        if (lastName) {
            setLastNameErr("");
        }
        if (email) {
            setEmailErr("");
        }
        if (creditCard) {
            setCreditCardErr("");
        }
        if (age) {
            setAgeErr("");
        }
    }, [firstName, lastName, email, creditCard, age]);

    const submitUser = async (e) => {

        e.preventDefault();
        if (firstName && lastName && email && creditCard && age && password && confirmPassword) {
            var id = params.id;
            var token = localStorage.getItem('token');
            var putResult = await fetch(`https://movie-collection-api-app.azurewebsites.net/api/access/${id}`, {
                method: "put",
                body: JSON.stringify({ firstName, lastName, email, creditCard, age, password, confirmPassword }),
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (putResult.status == 200) {
                setUpdateResult("User record updated");
            }
            else if (putResult.status == 500) {
                // 500 when the server side code fails to work with the user response such as password requirement rules of .Net Core
                setUpdateResult("");
                setConfirmPasswordErr("");
                setCreditCardErr("");
                setFirstNameErr("");
                setAgeErr("");
                setLastNameErr("");
                setPasswordErr("");

                var receivedErrorResponse = await putResult.json();

                var errorList = receivedErrorResponse.map((element) => {
                    return element.description;
                });
                setServerErr(errorList);
            }
            else if (putResult.status == 400) {
                // 400 error when the user response doesn't fails the validation set on the server side such as password and confirmPassword doesn't match on the server side validations
                setUpdateResult("");
                var receivedErrorResponse = await putResult.json();
                var receivedError = receivedErrorResponse.errors;
                setServerErr("");
                // var receivedError = JSON.parse(decodedValue).errors;
                receivedError.ConfirmPassword ? setConfirmPasswordErr('Confirm Password is required and shall match with Password field.') : setConfirmPasswordErr("");
                receivedError.CreditCard ? setCreditCardErr("Credit Card is required") : setCreditCardErr("");
                receivedError.FirstName ? setFirstNameErr("First Name is required") : setFirstNameErr("");
                receivedError.age ? setAgeErr("Age is required") : setAgeErr("");
                receivedError.LastName ? setLastNameErr("Last name is required") : setLastNameErr("");
                receivedError.Password ? setPasswordErr("Password is required for any profile update and shall match with ConfirmPassword field.") : setPasswordErr("");
            }
        }
        else {
            setUpdateResult("");
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
                {updateResult && <p className="update-success">{updateResult}</p>}
                <h1>Update Client profile</h1>
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

export default UpdateUser;