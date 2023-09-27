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
import Modal from "react-modal"; // Εισάγετε το Modal


const localizer = momentLocalizer(moment);

export const AdminSeeAppointments = (props) => {
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
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    const onChange = selectedDate => {
        setDate(selectedDate);
    };

    const handleSlotSelect = slotInfo => {

        axios.get(`/api/appointments/dateTime?date=${moment(slotInfo.start).format('DD-MM-YYYY')}&time=${moment(slotInfo.start).format('HH:mm')}`)
            .then(response => {
                console.log('Response:', response.data);
                if (response.data !== null) {
                    setSelectedAppointment(response.data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
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

        axios.get(`/api/shifts?date=${moment(newDate).format('DD-MM-YYYY ')}`)
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

    const handleDelete = (event, appointment) => {
        event.preventDefault();

        const confirmDelete = window.confirm("Are you sure, you want to cancel this appointment?");
        if (!confirmDelete) {
            return;
        }

        axios.post(`/api/appointment/delete`, appointment)
            .then(response => {
                console.log('Appointment deleted successfully.');
                setSelectedAppointment(null);

                // Ανανέωση των δεδομένων των ραντεβού
                axios.get(`/api/shifts?date=${moment(date).format('DD-MM-YYYY ')}`)
                    .then(response => {
                        console.log('Response:', response.data);
                        const newEvents = generateEvents(response.data, date);
                        setEvents(newEvents);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error deleting appointment:', error);
            });
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

            </div>
            {/* Modal */}
            <Modal
                isOpen={selectedAppointment !== null && selectedAppointment.user !== null}
                onRequestClose={() => setSelectedAppointment(null)}
                className="custom-modal"
            >
                {selectedAppointment && selectedAppointment.user ? (
                    <div>
                        <h2>Selected Appointment</h2>
                        <p>Date: {selectedAppointment.selectedAppointment.start_date}</p>
                        <p>Time: {selectedAppointment.selectedAppointment.start_time}-{selectedAppointment.selectedAppointment.end_time}</p>
                        <p>Name: {selectedAppointment.user.firstName} {selectedAppointment.user.lastName}</p>
                    </div>
                ) : null}
                <button onClick={() => setSelectedAppointment(null)}>Close</button>
                <button onClick={(event) => handleDelete(event, selectedAppointment.selectedAppointment)}>Cancel the Appointment</button>

            </Modal>

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
