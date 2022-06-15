import React from "react";
import { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import  Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import MovieList from "../MovieList/MovieList";
import SearchForm from "../SearchForm/SearchForm";
import Register from "../Register/Register";
import {
    onAuthStateChanged,
    signOut,
    getAuth
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, app, db} from "../../Firebase/firebase-config";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter,
    Routes
  } from "react-router-dom";


function MyMovies() {
    const favCollectionRef = collection(db, "favoriteMovies");
    const [myFavorites, setMyFavorites] = useState([]);
    const [idList, setIdList] = useState([]);
    const [moviesData, setMoviesData] = useState([]);
    const navigate = useNavigate();

   
    useEffect( () => {
        getMovies();
    }, [myFavorites]);
   
    const getMovies = async () => {
        const data = await getDocs(favCollectionRef);
        setMyFavorites(data.docs.map((doc) => ({...doc.data()})))
        
        const user = auth.currentUser;

        const tempIds = myFavorites.map((obj) =>{
            if(user.uid == obj.userId){
                return obj.id;
            }else{
                return null;
            }
        })

        function check(obj) {
            if(obj != null){
                return obj
            }
          }

        const newArr = tempIds.filter(check);
        setIdList(newArr);

        const movies = await Promise.all(
            newArr.map(async (obj) => {
            const url = `http://www.omdbapi.com/?i=${obj}&apikey=4297c969`;
            const response = await fetch(url);
            const responseJson = await response.json();
            return responseJson;
        }));
        setMoviesData(movies);
    };
    
    const logout = async () => {
        await signOut(auth);
        console.log("logged out");
      }


      const authorization = getAuth();
        onAuthStateChanged(authorization, (user) => {
        if (!user) {
            navigate('/login');
        }
        });

  return (
    <div className="CineHome">
                <Paper 
                style={{
                    padding: 0,
                    margin: 0,
                    height: "100vh",
                    backgroundColor: "white",
                }}
                elevation={0}
                >
                <AppBar color='primary' position='static' style={{height: "64px", backgroundColor: "#1C1C1C"}}>
            
                    <Toolbar>
                        {/* <Typography style={{color: "#E66A3B"}}>Cinemash</Typography> */}
                        <SearchIcon id="searchIcon" style={{color: "#E66A3B"}}/>
                        {/* <TextField  id="searchInput" value={searchValue} placeholder="Search Cinemash" variant="standard" InputProps={{ disableUnderline: true }}/> */}
                        <SearchForm/>
                        <Link exact to="/home"><Button id="navBtn">Home</Button></Link>
                        <Link exact to="/favorites"><Button id="navBtn">Favorites</Button></Link>
                        <Button onClick={logout} id="logBtn" variant="outlined">Log Out</Button>
                    </Toolbar>
                </AppBar>
                <div className="container-fluid movie-app">
                <h5 className="category">My movies</h5>
                    <div className="myRow">
                        <MovieList movies={moviesData}/>
                    </div>
                </div>
            </Paper>
        </div>
  );

}

export default MyMovies;

