import React, {useEffect, useState} from "react";
import "../index.css";
import "../style.css";
import axios from 'axios';
import profileImage from "../images/barber-removebg-preview.png";
import speechBubble from "../images/speech-bubble-removebg-preview.png";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "react-modal";






export const Statistics = (props) => {

    const navigate = useNavigate();
    const {state} = useLocation();
    const {userEmail} = state;
    const [userData, setUserData] = useState(null);
    const [stat, setStat] = useState(null);
    const [statistics, setStatistics] = useState(null);






    /*get users infos from database*/
    useEffect(() => {
        axios.get(`/api/users/basicUsers1stPage?email=${userEmail}`)
            .then(response => {
                console.log('Response:', response.data);
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userEmail]);


    const handleStatistics = (event,stat) => {
        event.preventDefault();
        setStat(stat)
        axios.get(`/api/appointments/stats?info=${stat}`)
            .then(response => {
                console.log('Response:', response.data);
                console.log(response.data[0]);
                setStatistics(response.data);

            })
            .catch(error => {
                console.error('Error:', error);
            });


    }


    return (
        <div className="body2">
            <h1 className="title2">Your Barber's App</h1>
            <div className="image-container">
                <img src={profileImage} alt="Profile" className="profile-image" />
                <div className="image-container2">
                    <div className="speech-bubble-container">
                        <img src={speechBubble} alt="Speech" className="speech-bubble" />
                            <p className="speech-text">Select what statistics you want to see.</p>
                    </div>
                </div>
            </div>
            <div style={{textAlign:'center'}}>
                <button className="statisticsBtn" onClick={(event) => handleStatistics(event, 0)}> Total Appointments </button><br/>
                <button className="statisticsBtn" onClick={(event) => handleStatistics(event, 1)}> Total Number of Appointments of the previous week/month  </button><br/>
                <button className="statisticsBtn" onClick={(event) => handleStatistics(event, 2)}> Appointment duration of the previous week/mont/year </button><br/>
                <button className="statisticsBtn" onClick={(event) => handleStatistics(event, 3)}> Number of Customers per Day/Week/Month </button><br/>
            </div>
            {/* Modal*/}
            <Modal
                isOpen={statistics !== null}
                onRequestClose={() => setStatistics(null)}
                className="custom-modal"
            >
                {statistics!== null && stat===0 ? (
                    <div>
                        <p>Total Appointments: {parseInt(statistics[0])}</p>
                    </div>
                ) : statistics!== null && statistics.length===2 && stat===1 ? (
                    <div>
                        <p>Total Appointments: <br/>
                            Last Week: {parseInt(statistics[0])}<br/>
                            Last Month: {parseInt(statistics[1])}</p>
                    </div>
                ): statistics!== null && statistics.length===3 && stat===2 ? (
                    <div>
                        <p>Average of Appointments Duration: <br/>
                            Total: {statistics[0] === 0 ? 0 : (statistics[0] / 3600).toFixed(2)} hours<br/>
                            Last Week: {statistics[1] === 0 ? 0 : (statistics[1] / 3600).toFixed(2)} hours<br/>
                            Last Month: {statistics[2] === 0 ? 0 : (statistics[2] / 3600).toFixed(2)} hours</p>
                    </div>
                ): statistics!== null && statistics.length===3 && stat===3 ? (
                    <div>
                        <p>Number of Customers: <br/>
                            Total: {parseInt(statistics[0])}<br/>
                            Last Week: {parseInt(statistics[1])}<br/>
                            Last Month: {parseInt(statistics[2])}</p>
                    </div>
                ):null}
                <button onClick={() => setStatistics(null) && setStat(null)}>Close</button>
            </Modal>
        </div>
    );
};
