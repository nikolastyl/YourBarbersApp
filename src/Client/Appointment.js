import React, { useEffect, useState } from "react";
import "../index.css";
import "../style.css";
import axios from 'axios';
import profileImage from "../images/barber-removebg-preview.png";
import speechBubble from "../images/speech-bubble-removebg-preview.png";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useLocation } from "react-router-dom";

const localizer = momentLocalizer(moment);

export const Appointment = (props) => {
    const { state } = useLocation();
    const { userEmail } = state;
    const [userData, setUserData] = useState(null);
    const [date, setDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [currentView, setCurrentView] = useState('month');
    const [selectedText, setSelectedText] = useState('Select a Date...');
    const [showButtons, setShowButtons] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [shouldRefreshAppointments, setShouldRefreshAppointments] = useState(true);
    const [events, setEvents] = useState([]);
    const [numbers, setNumbers] = useState([]);


    const onChange = selectedDate => {
        setDate(selectedDate);
    };

    const handleSlotSelect = slotInfo => {
        const selectedSlots = events.filter(event => {
            // Ελέγξτε αν το slotInfo είναι εντός του χρονικού διαστήματος του κάθε event
            return moment(slotInfo.start).isBetween(event.start, event.end, null, '[]') ||
                moment(slotInfo.end).isBetween(event.start, event.end, null, '[]');
        });

        if (selectedSlots.every(event => event.title === 'Available')) {
            setSelectedSlot(slotInfo);
            setSelectedText('Are you sure?? ' + moment(slotInfo.start).format('HH:mm') + '-' + moment(slotInfo.end).format('HH:mm'));
            setShowButtons(true);
        } else {
            setSelectedText('One or more slots are not available.');
            setShowButtons(false);
        }
    };







    const generateEvents = (userData, selectedDate) => {
        const events = [];
        const interval = 30;

        for (let i = 0; i < userData.length; i++) {
            const status = userData[i];
            const startTime = moment(selectedDate).startOf('day').add(i * interval, 'minutes');
            const endTime = startTime.clone().add(interval, 'minutes');

            let event = {
                title: '',
                start: startTime.toDate(),
                end: endTime.toDate(),
            };

            switch (status) {
                case 0:
                    event.title = 'Closed';
                    break;
                case 1:
                    event.title = 'Available';
                    break;
                case 2:
                    event.title = 'Booked';
                    break;
                default:
                    event.title = '-';
                    break;
            }

            events.push(event);
        }

        return events;
    };
//events colors
    const eventStyleGetter = (event, start, end, isSelected) => {
        let backgroundColor = '';
        let borderColor = '';

        switch (event.title) {
            case 'Available':
                backgroundColor = 'green';
                borderColor = 'darkgreen';
                break;
            case 'Booked':
                backgroundColor = 'red';
                borderColor = 'darkred';
                break;
            case 'Closed':
                backgroundColor = 'gray';
                borderColor = 'darkgray';
                break;
            default:
                backgroundColor = 'gray';
                borderColor = 'darkgray';
                break;
        }

        return {
            style: {
                backgroundColor,
                borderColor,
            }, // Επιστρέφουμε την επιλεξιμότητα του event
        };
    };
    const handleNavigate = newDate => {
        setShowButtons(false);
        setSelectedText('Drag-to-Select Time Range');
        setDate(newDate);

        axios
            .get(`/api/shifts?date=${moment(newDate).format('DD-MM-YYYY')}`)
            .then(response => {
                console.log('Response:', response.data);
                const newEvents = generateEvents(response.data, newDate);
                setEvents(newEvents);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const onViewChange = view => {
        setCurrentView(view);
        if (view === "month") {
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
        const appointmentData = {
            customer_id: userData.id,
            start_date: moment(selectedSlot.start).format('DD-MM-YYYY'),
            start_time: moment(selectedSlot.start).format('HH:mm'),
            end_time: moment(selectedSlot.end).format('HH:mm')
        };
        console.log(userData.id)

        axios.post("/api/appointment/book", appointmentData)
            .then(response => {
                console.log('Επιτυχής αποθήκευση δεδομένων:', response.data);
                setSelectedText('The reservation was successful!!');

                // Μετά την επιτυχή ολοκλήρωση της κράτησης, ανανεώστε τα events
                axios.get(`/api/shifts?date=${moment(date).format('DD-MM-YYYY')}`)
                    .then(response => {
                        console.log('Response:', response.data);
                        setNumbers(response.data)
                        const newEvents = generateEvents(response.data, date);
                        setEvents(newEvents);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

                setShouldRefreshAppointments(true);
            })
            .catch(error => {
                console.error('Σφάλμα κατά την αποθήκευση δεδομένων:', error);
                setSelectedText('Something went wrong...')
            });

        setShowButtons(false);

    }

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
                    </div>
                )}
            </div>
            <div style={{ height: '700px', width: '800px', fontSize: '26px' }}>
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
                    events={events}
                    eventPropGetter={eventStyleGetter}

                />
            </div>
        </div>
    );
};
