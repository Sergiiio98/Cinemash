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
import MovieList from "./MovieList";
import SearchForm from "./SearchForm";
import Register from "./Register";
import {
    onAuthStateChanged,
    signOut,
    getAuth
} from "firebase/auth";
import {collection, getDocs, addDoc} from 'firebase/firestore';
import { auth, app, db} from "./firebase-config";
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

   
    useEffect(() => {
            const getMovies = async () => {
                const data = await getDocs(favCollectionRef);
                setMyFavorites(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
                // console.log(data);
                // console.log(myFavorites);

                const tempIds = myFavorites.map((obj) =>{
                    return obj.id;
                })
                // console.log(tempIds);

                const someFunction = () => {
                    const render = tempIds.map(async (obj) => {
                        const url = `http://www.omdbapi.com/?s=${obj}&apikey=4297c969`;
                        const response = await fetch(url);
                        const responseJson = await response.json();
                        return responseJson.Search;
                    })
                    const data = Promise.all(render);
                    setMoviesData(data);
                    console.log("movies data");
                    console.log(moviesData);
                }

            

               


            //    console.log(moviesData);

            };
        getMovies();
    }, []);
   
    
    const logout = async () => {
        await signOut(auth);
        console.log("logged out");
      }





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
                        <Button id="navBtn">My Movies</Button>
                        <Button id="navBtn">Database</Button>
                        <Button id="navBtn">Profile</Button> 
                        <Link exact to="/register" ><Button id="navBtn">Register</Button></Link>
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

