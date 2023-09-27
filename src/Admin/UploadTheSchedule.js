import React, {useEffect, useState} from "react";
import "../index.css";
import "../style.css";
import axios from 'axios';
import profileImage from "../images/barber-removebg-preview.png";
import speechBubble from "../images/speech-bubble-removebg-preview.png";
import upload from "../images/upload-removebg-preview.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation, useNavigate} from "react-router-dom";





export const UploadTheSchedule = (props) => {

    const navigate = useNavigate();
    const {state} = useLocation();
    const {userEmail} = state;
    const [userData, setUserData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const notify = () => {
        toast.success('Successful Upload!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post('/api/upload', formData)
                .then(response => {
                    setUploadStatus('Upload successful');
                    notify()
                    // Do further processing if needed
                })
                .catch(error => {
                    setUploadStatus('Upload failed');
                    console.error('Error:', error);
                });
        } else {
            setUploadStatus('Please select a file');
        }
    };





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
                                Upload Weekly Schedule...</p>
                        )}

                    </div>
                </div>

            </div>
            <div className="wrapper">
                <div className="field">
                    <div className="upload-label">
                    <label >
                        <input className="uploadInput" type="file" accept=".csv,.xlsx" onChange={handleFileChange}/>
                        <img src={upload} alt="upload" className="uploadImage"/>
                    </label>
                    <p className="upload-label">Choose a .csv or .xlsx file</p>


            <button className="buttonsYes-No" onClick={handleUpload}>Upload</button>
            <p>{uploadStatus}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};
