import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {db} from './firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';

function Register() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginrEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const register = () => {

  }

  const login = () => {

  }

  const logout = () => {

  }

  
  return (
    <div>
        <h3>Register</h3>
        <input placeholder="Email..." onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}/>
        <input placeholder="Password..." onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}/>
        <button> Sign Up</button>
    </div>
  );

}
    
export default Register;
