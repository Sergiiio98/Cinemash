import React from 'react'
import { useState, useEffect } from 'react';
import {db} from './firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Register from "./Register";
import Login from "./Login";

import CineHome from "./CineHome";
import NotFound from "./NotFound";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes
} from "react-router-dom";



function App() {
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const favCollectionRef = collection(db, "favoriteMovies");


  const addFavorite = async (id) => {
    // await setFavorites([...favorites, id]);
    await addDoc(favCollectionRef, {id: id});
    // console.log(id);
    // console.log(favorites);
  }


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      // console.log(data);
      console.log(users);


  };
    getUsers();
  }, []);

    return (
    <Router>
    
      <div className="App">
        
      

        <Routes>
          <Route exact path="/home" element={<CineHome/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>



    </Router>
  );

}
    
export default App;
