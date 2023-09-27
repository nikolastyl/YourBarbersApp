import React, {useEffect, useState} from "react";
import "../index.css";
import "../style.css";
import axios from 'axios';
import profileImage from "../images/barber-removebg-preview.png";
import bookingImage from "../images/bookAppointment-removebg-preview.png";
import infosImage from "../images/infos-removebg-preview.png";
import speechBubble from "../images/speech-bubble-removebg-preview.png";
import {useLocation, useNavigate} from "react-router-dom";





export const BasicUser1stPage = (props) => {

    const {state} = useLocation();
    const {userEmail} = state;
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    console.log(isLoggedIn)



    const makeAnAppointment = (event) => {
        navigate('/appointment', { state: { userEmail: userEmail } });
    };

    const yourAppointments = (event) => {
        navigate('/basicUserYourAppointments', { state: { userEmail: userEmail } });
    };

    /*get users infos from database*/
    useEffect(() => {

        if (isLoggedIn==='false') {
            // Αν ο χρήστης δεν έχει συνδεθεί, ανακατευθύνετε τον στη σελίδα σύνδεσης
            return navigate('/login');
        }
        axios.get(`/api/users/basicUsers1stPage?email=${userEmail}`)
            .then(response => {
                console.log('Response:', response.data);
                setUserData(response.data); // Save the response data to the state
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userEmail, isLoggedIn, navigate]); // Run the effect whenever usersEmail changes


    return (
        <div className="body2">
            <h1 className="title2">Your Barber's App</h1>
            <div className="image-container">
                <img src={profileImage} alt="Profile" className="profile-image" />
                <div className="image-container2">
                    <div className="speech-bubble-container">
                        <img src={speechBubble} alt="Speech" className="speech-bubble" />
                        {userData && (
                        <p className="speech-text">
                            Welcome {userData.firstName} !</p>
                        )}

                    </div>
                </div>
            </div>
            <div className="image-container">
            <button className="book-infos-button" onClick={makeAnAppointment} >
            <img src={bookingImage} alt="Bookings" className="book-infos-image" />
                <h2>Make an Appointment</h2>
                <br/>
            </button>
            <button className="book-infos-button">
            <img src={infosImage} alt="Infos" className="book-infos-image" onClick={yourAppointments}/>
                <h2>Your Appointments</h2>
                <br/>
            </button>
            </div>
            <div style={{textAlign: "center"}}>
                <p>Tasos's Barbershop</p>
                <br/>
                <p>Theodosiou 61 Patra</p>
                <br/>
                <p>2610123123, 6910922314</p>
            </div>

        </div>
    );
};
