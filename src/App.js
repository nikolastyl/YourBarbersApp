import logo from './images/logo.svg';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import {BasicUser1stPage} from "./BasicUser1stPage";
import {Appointment} from "./Appointment";

import {useState} from "react";


function App() {

  const [currentForm, setCurrentForm] = useState('login');
  const [usersEmail,setUsersEmail] = useState(null);


  const toggleForm = (formName,param1) => {
    setCurrentForm(formName);
    setUsersEmail(param1)
  }


  return (
      <div className="App">
        {currentForm === 'login' ? (
            <Login onFormSwitch={toggleForm} />
        ) : currentForm==='register'?(
            <Register onFormSwitch={toggleForm}/>
        ): currentForm==='basicUser1stPage'?(
            <BasicUser1stPage onFormSwitch={toggleForm}
            usersEmail={usersEmail}
            />
        ): currentForm==='appointment'?(
            <Appointment onFormSwitch={toggleForm}
            usersEmail={usersEmail}
            />
        ): null}
      </div>
  );
}

export default App;
