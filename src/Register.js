import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {db} from './firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';

function Register() {
  
  return (
    <div>
        <h3>Register</h3>
        <input placeholder="Email..."/>
        <input placeholder="Password..."/>
        <button> Sign Up</button>
    </div>
  );

}
    
export default Register;
