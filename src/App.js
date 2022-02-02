import CineHome from "./CineHome";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {db} from './firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';

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
    <div className="App">
      <CineHome addFavorite={addFavorite}/>
      {users.map((user) => {
        return (
          <div>
            {/* <h1>Name: {user.name}</h1> */}
          </div>
        );
      })}
    </div>
  );

}
    
export default App;
