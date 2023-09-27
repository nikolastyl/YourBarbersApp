import React, { useState } from "react";
import "./index.css";
import "./style.css";

import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export const Register = (props) => {
    const [errorMessages, setErrorMessages] = useState({});
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        var { firstname, lastname, phone, email, password } = document.forms[0];

        const formData = {
            firstName: firstname.value,
            lastName: lastname.value,
            phoneNumber: phone.value,
            email: email.value,
            password: password.value,
            barber: false,
            admin: false
        };
        console.log(formData)



        axios.get(`/api/users/${formData.email}`)
            .then(response => {
                if (response.data.exists) {
                    setErrorMessages({
                        name: "email",
                        message: "User already exists"
                    });
                } else {
                    axios.post("/api/users/register", formData)
                        .then(response => {
                            console.log('Επιτυχής αποθήκευση δεδομένων:', response.data);
                            navigate('/basicUser1stPage', { state: { userEmail: formData.email } });
                        })
                        .catch(error => {
                            console.error('Σφάλμα κατά την αποθήκευση δεδομένων:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Σφάλμα κατά την επικοινωνία με τον διακομιστή:', error);
            });

    }

    const errors = {
        pass: "invalid password"
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );


    return (
        <div>
            <h1 className="title2">Your Barber's App</h1>
            <br/><br/><br/>
            <div className="wrapper">
                <div className="title">
                    SignUp
                </div>
                <form>
                    <div className="field">
                        <input type="text" id="firstname" required placeholder="First Name"/>
                    </div>
                    <div className="field">
                        <input type="text" id="lastname" required placeholder="Last Name"/>
                    </div>
                    <div className="field">
                        <input type="number" id="phone" required placeholder="Phone number"/>
                    </div>
                    <div className="field">
                        <input type="email" id="email" required placeholder="Email Address"/>
                    </div>
                    <div className="field">
                        <input type="password" id="password" required placeholder="Password" />
                    </div>
                    <div className="field">
                        <button onClick={handleSubmit}>SignUp</button>
                    </div>
                    <div className="signup-link">
                        Already a member? <a onClick={() => navigate('/login')}>Log-in now</a>
                    </div>
                </form>
            </div>
        </div>

    );
};
