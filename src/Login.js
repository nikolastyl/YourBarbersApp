import React, { useState } from "react";
import "./index.css";
import "./style.css";
import axios from 'axios';
import profileImage from "./images/barber-removebg-preview.png";
import { useNavigate } from 'react-router-dom';








export const Login = (props) => {

    const [errorMessages, setErrorMessages] = useState({});

    const navigate = useNavigate();

    localStorage.setItem('isLoggedIn', 'false');
    console.log(localStorage.getItem('isLoggedIn'))

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        const { email, pass } = document.forms[0];


        const formData = {
            email: email.value,
            password: pass.value
        };


    axios.post("/api/users/login", formData)
            .then(response => {
                console.log('Response:', response.data);
                if (response.data === "Successful Log in") {
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/basicUser1stPage', { state: { userEmail: formData.email } });
                } else if (response.data === "Successful log-in Admin") {
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/admin1stPage', { state: { userEmail: formData.email } });


                } else
                {
                    setErrorMessages({ name: "pass", message: response.data });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });


    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );


    const errors = {
        email: "invalid email",
        pass: "invalid password"
    };


    return (
        <div>
            <h1 className="title2">Your Barber's App</h1>
            <div className="image-container">
                <img src={profileImage} alt="Profile" className="profile-image" />
            </div>
            <div className="wrapper">
            <div className="title">
                Login
            </div>
            <form>
                <div className="field">
                    <input type="text" id="email" required placeholder="Email Address"/>
                    {renderErrorMessage("email")}
                </div>
                <div className="field">
                    <input type="password" id="pass" required placeholder="Password" />
                    {renderErrorMessage("pass")}
                </div>
                <br/>
                <div className="field">
                    <button onClick={handleSubmit}>Login</button>
                </div>
                <div className="signup-link">
                    Not a member? <a onClick={() => navigate('/register')}>Signup now</a>
                </div>
            </form>
        </div>
        </div>

    );
};
