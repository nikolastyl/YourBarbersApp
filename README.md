
Your Barber's App
A full-stack web application for barber shop appointment management, allowing customers to schedule appointments online while providing administrators with tools to manage schedules, appointments and business statistics.

Overview
The application was developed as part of the "Web Information Systems" course at the University of Piraeus.

Customers can:

Register and authenticate
Schedule appointments based on staff availability
View appointment history
Cancel upcoming appointments
Administrators can:

Upload employee schedules
View and manage appointments
Cancel appointments
Access appointment statistics and reports
Features
Customer Features
User registration and login
Appointment booking
Appointment cancellation
Appointment history
Real-time availability display
Admin Features
Shift upload via CSV/XLSX files
Appointment management
Business statistics dashboard
Schedule administration
Technologies Used
Backend
Java
Spring Boot
Frontend
React.js
HTML5
CSS3
JavaScript
Database
PostgreSQL
Tools
IntelliJ IDEA
pgAdmin
Visual Paradigm
System Architecture
The system follows a full-stack architecture:

Frontend (React) ↓ REST API (Spring Boot) ↓ PostgreSQL Database

Database Entities
User
Stores:

Personal information
Authentication data
User roles (Customer / Barber / Admin)
Appointments
Stores:

Appointment date
Start time
End time
Customer information
Shifts
Stores:

Barber schedules
Daily availability
Screenshots
Login Page

<img width="264" height="267" alt="Screenshot 2026-11-20 at 2 40 32 PM" src="https://github.com/user-attachments/assets/74a24cce-9f67-4326-bf2f-437c5925a120" />



Appointment Booking

<img width="358" height="324" alt="Screenshot 2026-11-20 at 2 41 28 PM" src="https://github.com/user-attachments/assets/b54bb464-f668-47a9-bfa5-86095adac32f" />



Appointment Management

<img width="358" height="347" alt="Screenshot 2026-11-20 at 2 41 50 PM" src="https://github.com/user-attachments/assets/428373a6-cd30-40d5-8fd0-8c9b1de83521" />



Statistics Dashboard

<img width="305" height="305" alt="Screenshot 2026-11-20 at 2 42 19 PM" src="https://github.com/user-attachments/assets/bbda3b95-38f0-4237-8ecd-77e9c38f3853" />



Future Improvements
Email notifications
SMS reminders
Multiple barber shops support
Online payments
Mobile application version

University of Piraeus





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
