import React, {useEffect, useState} from "react";
import "../index.css";
import "../style.css";
import axios from 'axios';
import profileImage from "../images/barber-removebg-preview.png";
import bookingImage from "../images/bookAppointment-removebg-preview.png";
import infosImage from "../images/infos-removebg-preview.png";
import speechBubble from "../images/speech-bubble-removebg-preview.png";
import schedule from "../images/schedule-removebg-preview.png";
import invite from "../images/invite-removebg-preview.png";
import {Navigate, useLocation, useNavigate} from "react-router-dom";






export const Admin1stPage = (props) => {

    const navigate = useNavigate();
    const {state} = useLocation();
    const {userEmail} = state;
    const [userData, setUserData] = useState(null);
    console.log(userEmail);

    const isLoggedIn = localStorage.getItem('isLoggedIn');





    /*get users infos from database*/
    useEffect(() => {
        if (isLoggedIn==='false') {
            // Αν ο χρήστης δεν έχει συνδεθεί, ανακατευθύνετε τον στη σελίδα σύνδεσης
            return navigate('/login');        }
        axios.get(`/api/users/basicUsers1stPage?email=${userEmail}`)
            .then(response => {
                console.log('Response:', response.data);
                setUserData(response.data); // Save the response data to the state
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userEmail]); // Run the effect whenever usersEmail changes


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
                <button className="book-infos-button" onClick={() => navigate('/uploadTheSchedule', { state: { userEmail: userEmail } })} >
                    <img src={schedule} alt="Schedule" className="book-infos-image"/>
                    <h2>Upload the Shifts</h2>
                    <br/>
                </button>
                <button className="book-infos-button"  onClick={() => navigate('/statistics', { state: { userEmail: userEmail } })}>
                    <img src={infosImage} alt="Statistics" className="book-infos-image" />
                    <h2>Statistics</h2>
                    <br/>
                </button>
                <button className="book-infos-button" onClick={() => navigate('/adminSeeAppointments', { state: { userEmail: userEmail } })}>
                    <img src={bookingImage} alt="Appointments" className="book-infos-image" />
                    <h2>Appointments</h2>
                    <br/>
                </button>
            </div>
        </div>
    );
};
