import React, {useEffect, useState} from "react";
import "../index.css";
import "../style.css";
import axios from 'axios';
import profileImage from "../images/barber-removebg-preview.png";
import bookingImage from "../images/bookAppointment-removebg-preview.png";
import infosImage from "../images/infos-removebg-preview.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import speechBubble from "../images/speech-bubble-removebg-preview.png";
import {useLocation, useNavigate} from "react-router-dom";
//import {toast} from "react-toastify";






export const BasicUserYourAppointments = (props) => {

    const {state} = useLocation();
    const {userEmail} = state;
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [userAppointments, setUserAppointments] = useState([]);
    const [shouldRefreshAppointments, setShouldRefreshAppointments] = useState(true);


    /*get users infos from database*/
    useEffect(() => {
        axios.get(`/api/users/basicUsers1stPage?email=${userEmail}`)
            .then(response => {
                console.log('Response:', response.data);
                setUserData(response.data); // Save the response data to the state
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userEmail]); // Run the effect whenever usersEmail changes

    /*get users appointments from database*/
    useEffect(() => {
        axios.get(`/api/appointments/byUser?email=${userEmail}`)
            .then(response => {
                console.log('Response:', response.data);
                setUserAppointments(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userEmail, shouldRefreshAppointments]); // Run the effect whenever usersEmail changes

    const notify = () => {
        toast.success('Successful!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }







    const handleDelete = (event, appointment) => {
        event.preventDefault();

        const confirmDelete = window.confirm("Are you sure, you want to cansel this appointment??");
        if (!confirmDelete) {
            return;
        }

        axios.post(`/api/appointment/delete`,appointment)
            .then(response => {
                console.log('Appointment deleted successfully.');
                setShouldRefreshAppointments(prevState => !prevState);

            })
            .catch(error => {
                console.error('Error deleting appointment:', error);
            });
    }

    return (
        <div className="body2">
            <ToastContainer />
            <h1 className="title2">Your Barber's App</h1>
            <div className="image-container">
                <img src={profileImage} alt="Profile" className="profile-image" />
                <div className="image-container2">
                    <div className="speech-bubble-container">
                        <img src={speechBubble} alt="Speech" className="speech-bubble" />
                        {userData && (
                            <p className="speech-text">
                                Click on x to cancel an appointment</p>
                        )}
                    </div>

                </div>
            </div>
            <div className="wrapper">
                <form>
                    <h1>Your Appointments</h1>
                    <ul className="appointment-list">
                        {userAppointments
                            .map(appointment => ({
                                ...appointment,
                                startDate: new Date(
                                    parseInt(appointment.start_date.split("-")[2]),
                                    parseInt(appointment.start_date.split("-")[1]) - 1,
                                    parseInt(appointment.start_date.split("-")[0])
                                ),
                            }))
                            .sort((a, b) => {
                                return b.startDate - a.startDate;
                            })
                            .map(appointment => (
                                <li
                                    key={appointment.id}
                                    className={
                                        new Date() > appointment.startDate
                                            ? "grayed-out"
                                            : "" // Προσθέστε την κλάση "grayed-out" αν η ημερομηνία έχει περάσει
                                    }
                                >
                                    <div className="appointment-info">

                                    <p>Date: {appointment.start_date}</p>
                                    <p>Start Time: {appointment.start_time}</p>
                                    <p>End Time: {appointment.end_time}</p>
                                    </div>
                                    {!(
                                        new Date() > appointment.startDate
                                    ) && (
                                        <button onClick={(event) => handleDelete(event, appointment)}>X</button>
                                    )}
                                </li>
                            ))}
                    </ul>
                </form>

            </div>


        </div>
    );
};
