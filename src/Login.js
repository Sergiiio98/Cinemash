import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from './firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    getAuth
} from "firebase/auth";
import { auth, app,} from "./firebase-config";


function Login() {

  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
  });

  const login = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);
      navigate('/home');  
      console.log("done");
    } catch (error){
      console.log(error.message);
    }
  }

const logout = async () => {
    await signOut(auth);
    console.log("logged out");
  }
  
    const authorization = getAuth();
      onAuthStateChanged(authorization, (user) => {
        if (user) {
          navigate('/home');
        }
      });



  return (
    <div className="registerBox">
        <h3 id="register1">Cinemash</h3>
        <h5 id="register">Log in...</h5>

        <input type="email" className="Input" placeholder="Email..." onChange={(event) => {
          setLoginEmail(event.target.value);
        }}/>
        <input type="password" className="Input" placeholder="Password..." onChange={(event) => {
          setLoginPassword(event.target.value);
        }}/>
        <button className="cineBtn" onClick={login}> Log in</button>
        {/* <button className="cineBtn" onClick={logout}> Log out</button> */}


        {/* <h1>logged in as: {user.email}</h1> */}
    </div>
  );

}

export default Login;

