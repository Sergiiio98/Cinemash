import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {db} from './firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "./firebase-config";

function Register() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  // const [loginEmail, setLoginrEmail] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");
  const register = async () => {
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user);

    } catch (error){
      console.log(error.message);
    }
  }

  const logout = () => {

  }

  
  return (
    <div className="registerBox">
        <h3 id="register">Cinemash</h3>
        <h5 id="register">Create an account...</h5>

        <input type="email" className="Input" placeholder="Email..." onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}/>
        <input type="password" className="Input" placeholder="Password..." onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}/>
        <button className="cineBtn" onClick={register}> Sign Up</button>
    </div>
  );

}
    
export default Register;
