import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXjSuXASPRQ-97ZrVYhr2ZDz96z5WgzOo",
    authDomain: "cinemash-70057.firebaseapp.com",
    projectId: "cinemash-70057",
    storageBucket: "cinemash-70057.appspot.com",
    messagingSenderId: "41132345646",
    appId: "1:41132345646:web:49a0ae75098839e13c92bf"
  };




const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);