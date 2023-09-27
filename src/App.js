import logo from './images/logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter, Routes ,Route, Redirect, Link, Outlet, useNavigate} from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import {BasicUser1stPage} from "./Client/BasicUser1stPage";
import {Appointment} from "./Client/Appointment";
import {Admin1stPage} from "./Admin/Admin1stPage";
import {UploadTheSchedule} from "./Admin/UploadTheSchedule";
import {BasicUserYourAppointments} from "./Client/BasicUserYourAppointments";
import {AdminSeeAppointments} from "./Admin/AdminSeeAppointments";
import {Statistics} from "./Admin/Statistics";
import {useState} from "react";

function NotFound() {
    return (
        <div>
            <h1>Page Not Found</h1>
            <p>The requested page could not be found.</p>
        </div>
    );
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/basicUser1stPage' element={<BasicUser1stPage/>} />
                <Route path='/appointment' element={<Appointment/>} />
                <Route path='/admin1stPage' element={<Admin1stPage/>} />
                <Route path='/uploadTheSchedule' element={<UploadTheSchedule/>} />
                <Route path='/basicUserYourAppointments' element={<BasicUserYourAppointments/>}/>
                <Route path='/adminSeeAppointments' element={<AdminSeeAppointments/>}/>
                <Route path='/statistics' element={<Statistics/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
