import React, {useEffect, useState} from "react";
import "./index.css";
import "./style.css";
import axios from 'axios';
import profileImage from "./images/barber-removebg-preview.png";
import speechBubble from "./images/speech-bubble-removebg-preview.png";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);




export const Appointment = (props) => {

    const {usersEmail} = props;
    const [userData, setUserData] = useState(null);
    const [date, setDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null); // Καθορίζει την επιλεγμένη ώρα
    const [currentView, setCurrentView] = useState('month');
    const [selectedText, setSelectedText] = useState('Select a Date...');
    const [showButtons, setShowButtons] = useState(false); // Κατάσταση για εμφάνιση κουμπιών




    const onChange = selectedDate => {
        console.log(selectedDate)
        setDate(selectedDate);
    };

    const handleSlotSelect = slotInfo => {
        console.log(slotInfo)
        console.log(moment(slotInfo.start).format('HH:mm')!==moment(slotInfo.end).format('HH:mm'));


        if(moment(slotInfo.start).format('HH:mm')!==moment(slotInfo.end).format('HH:mm')) { //to not reserve all the day a client by mistake
            setSelectedSlot(slotInfo);
            setSelectedText('Are you sure?? ' + moment(slotInfo.start).format('HH:mm') + '-' + moment(slotInfo.end).format('HH:mm'));
            setShowButtons(true);
        }
    };

    const handleNavigate = newDate => {
        setShowButtons(false);
        setSelectedText('Drag-to-Select Time Range')
        setDate(newDate);
    };

    const onViewChange = view => {
        setCurrentView(view);
        if(view==="month"){
            setShowButtons(false);
            setSelectedText('Select a Date...')
        }
    };

    const noButton = (event) => {
        setShowButtons(false);
        setSelectedSlot(null);
        setSelectedText('Drag-to-Select Time Range')

    }

    const yesButton = (event) => {
        setShowButtons(false);
        setSelectedText('The reservation was successful!!')

    }



    /*get users infos from database*/
    useEffect(() => {
        axios.get(`/api/users/basicUsers1stPage?email=${usersEmail}`)
            .then(response => {
                console.log('Response:', response.data);
                setUserData(response.data); // Save the response data to the state
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [usersEmail]); // Run the effect whenever usersEmail changes


    return (
        <div className="body2">
            <div className="image-container">
                <img src={profileImage} alt="Profile" className="profile-image" />
                <div className="image-container2">
                <div className="speech-bubble-container">
                    <img src={speechBubble} alt="Speech" className="speech-bubble" />
                    <p className="speech-text">
                    {selectedText}
                    </p>
                </div>
                </div>
                {showButtons && (
                <div className="buttons-container">
                    <button className="buttonsYes-No" onClick={yesButton}>Yes</button>
                    <button className="buttonsYes-No" onClick={noButton}>No</button>
                </div>)}
            </div>
            <div  style={{ height: '700px', width:'800px', fontSize: '26px'}}>
                    <Calendar
                        localizer={localizer}
                        onChange={onChange}
                        value={date}
                        onNavigate={handleNavigate}
                        views={['month', 'day', 'agenda']}
                        view={currentView}
                        onView={onViewChange}
                        selectable={true}
                        onSelectSlot={handleSlotSelect}
                    />
                </div>

        </div>
    );
};
