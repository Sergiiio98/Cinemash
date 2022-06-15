import React from 'react'
import { useState, useEffect } from 'react';
import {db} from './Firebase/firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { doc, updateDoc, deleteField } from "firebase/firestore";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CineHome from "./components/CineHome/CineHome";
import NotFound from "./components/NotFound/NotFound";
import MyMovies from "./components/MyMovies/MyMovies";

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
    const auth = getAuth();
    const user = auth.currentUser;
    // await setFavorites([...favorites, id]);
    await addDoc(favCollectionRef, {id: id, userId: user.uid});
    console.log(id);
    
    // console.log(favorites);
  }

  const deleteFavorite = async (id) => {
    const auth = getAuth();
    const user = auth.currentUser;
    await updateDoc(favCollectionRef, {
      userId: deleteField()
    });
  
    console.log(id);
    
  }


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  };
    getUsers();
  }, []);

    return (
    <Router>
    
      <div className="App">
        
      

        <Routes>
          <Route exact path="/home" element={<CineHome addFavorite={addFavorite} deleteFavorite={deleteFavorite}/>}/>
          <Route exact path="/favorites" element={<MyMovies/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>



    </Router>
  );

}
    
export default App;
