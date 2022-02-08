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
import { auth, app,} from "./firebase-config";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter,
    Routes
  } from "react-router-dom";

function CineHome({addFavorite}){
    const starWars = [
        {
            "Title": "Star Wars: Episode IV - A New Hope",
            "Year": "1977",
            "imdbID": "tt0076759",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        },
        {
            "Title": "Star Wars: Episode V - The Empire Strikes Back",
            "Year": "1980",
            "imdbID": "tt0080684",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        },
        {
            "Title": "Star Wars: Episode VI - Return of the Jedi",
            "Year": "1983",
            "imdbID": "tt0086190",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Star Wars: Episode VII - The Force Awakens",
            "Year": "2015",
            "imdbID": "tt2488496",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg"
        },
        {
            "Title": "Star Wars: Episode I - The Phantom Menace",
            "Year": "1999",
            "imdbID": "tt0120915",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Star Wars: Episode III - Revenge of the Sith",
            "Year": "2005",
            "imdbID": "tt0121766",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg"
        },
        {
            "Title": "Star Wars: Episode II - Attack of the Clones",
            "Year": "2002",
            "imdbID": "tt0121765",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
        },
        {
            "Title": "Star Wars: Episode VIII - The Last Jedi",
            "Year": "2017",
            "imdbID": "tt2527336",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"
        },
        {
            "Title": "Rogue One: A Star Wars Story",
            "Year": "2016",
            "imdbID": "tt3748528",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg"
        },
        {
            "Title": "Star Wars: Episode IX - The Rise of Skywalker",
            "Year": "2019",
            "imdbID": "tt2527338",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg"
        }
    ];

    const avengers = [
        {
            "Title": "The Avengers",
            "Year": "2012",
            "imdbID": "tt0848228",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        },
        {
            "Title": "Avengers: Endgame",
            "Year": "2019",
            "imdbID": "tt4154796",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
        },
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Avengers: Age of Ultron",
            "Year": "2015",
            "imdbID": "tt2395427",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
        },
        {
            "Title": "The Avengers",
            "Year": "1998",
            "imdbID": "tt0118661",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
        },
        {
            "Title": "The Avengers: Earth's Mightiest Heroes",
            "Year": "2010–2012",
            "imdbID": "tt1626038",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"
        },
        {
            "Title": "Ultimate Avengers: The Movie",
            "Year": "2006",
            "imdbID": "tt0491703",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTYyMjk0NTMwMl5BMl5BanBnXkFtZTgwNzY0NjAwNzE@._V1_SX300.jpg"
        },
        {
            "Title": "Ultimate Avengers II",
            "Year": "2006",
            "imdbID": "tt0803093",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        },
        {
            "Title": "The Avengers",
            "Year": "1961–1969",
            "imdbID": "tt0054518",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZWQwZTdjMDUtNTY1YS00MDI0LWFkNjYtZDA4MDdmZjdlMDRlXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
        },
        {
            "Title": "Avengers Assemble",
            "Year": "2012–2019",
            "imdbID": "tt2455546",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg"
        }
    ];

    const rambo = [
        {
            "Title": "Rambo",
            "Year": "2008",
            "imdbID": "tt0462499",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg"
        },
        {
            "Title": "Rambo: First Blood Part II",
            "Year": "1985",
            "imdbID": "tt0089880",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZWFkY2I1ZDAtNmZhNS00NjVlLWJiMGQtMGQ1ZmM0ZDA5ODg5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
        },
        {
            "Title": "Rambo III",
            "Year": "1988",
            "imdbID": "tt0095956",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOTIwNWJhZDItZmNmOC00M2NkLWIwNDktMTYwZWFlZDVkMmVkL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Rambo: Last Blood",
            "Year": "2019",
            "imdbID": "tt1206885",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNTAxZWM2OTgtOTQzOC00ZTI5LTgyYjktZTRhYWM4YWQxNWI0XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg"
        },
        {
            "Title": "Rambo",
            "Year": "1986",
            "imdbID": "tt0222619",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZDQ0M2M2MjktMmViYy00MDM5LWE1NWEtZmRhNzZmMGM3MzkxXkEyXkFqcGdeQXVyMjY3MjUzNDk@._V1_SX300.jpg"
        },
        {
            "Title": "Rambo III",
            "Year": "1989",
            "imdbID": "tt0301766",
            "Type": "game",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDE3Y2NkODgtMzhmNi00M2M3LTgxMTAtNjBhNTJiOTdmZDIzXkEyXkFqcGdeQXVyMjY3MjUzNDk@._V1_SX300.jpg"
        },
        {
            "Title": "Rambo: First Blood Part II",
            "Year": "1986",
            "imdbID": "tt0301768",
            "Type": "game",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOWUzMDE1NTktMTU0OS00NTE3LWE2NzItMzA3MGM2NzdkYTJlXkEyXkFqcGdeQXVyMjY3MjUzNDk@._V1_SX300.jpg"
        },
        {
            "Title": "Rambo",
            "Year": "2012",
            "imdbID": "tt3107798",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDUwOGYwYWUtZjMzNi00MDIwLWE2NjgtYTdhODJmMTQwMGMyXkEyXkFqcGdeQXVyMzQzMDc2MDk@._V1_SX300.jpg"
        },
        {
            "Title": "Rambo",
            "Year": "1987",
            "imdbID": "tt0301765",
            "Type": "game",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYmMxZGVjYzYtNWY4ZC00ZjAwLWFjNWQtOWFjNGEzNDQ2ZDM3XkEyXkFqcGdeQXVyMTgwOTE5NDk@._V1_SX300.jpg"
        },
        {
            "Title": "Arthur Rambo",
            "Year": "2021",
            "imdbID": "tt10951972",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNzg5ZjJiNWEtNzhiZC00NzNhLThjZDgtZGU4OTMwN2I5YWY1XkEyXkFqcGdeQXVyNDgzNjg5Nw@@._V1_SX300.jpg"
        }
    ];

    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("star wars");
    const getMovieRequest = async () =>{
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=4297c969`;
        const response = await fetch(url);
        const responseJson = await response.json();

        setMovies(responseJson.Search);
    }
    const navigate = useNavigate();

    useEffect(() =>{
        getMovieRequest();
    }, [searchValue]);

    const addSearch = newSearchText => {
        setSearchValue(newSearchText);
    }

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
    return(
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
                        <SearchForm addSearch={addSearch}/>
                        <Button id="navBtn">My Movies</Button>
                        <Button id="navBtn">Database</Button>
                        <Button id="navBtn">Profile</Button> 
                        <Link exact to="/register" ><Button id="navBtn">Register</Button></Link>
                        <Button onClick={logout} id="logBtn" variant="outlined">Log Out</Button>
                    </Toolbar>
                </AppBar>
                <div className="container-fluid movie-app">
                <h5 className="category">Star Wars Movies</h5>
                    <div className="myRow">
                        <MovieList movies={starWars} addFavorite={addFavorite}/>
                    </div>
                <h5 className="category">Avengers</h5>
                    <div className="myRow">
                    <   MovieList movies={avengers} addFavorite={addFavorite}/>
                    </div>
                <h5 className="category">The Rambo series</h5>    
                    <div className="myRow">
                        <MovieList movies={rambo} addFavorite={addFavorite}/>
                    </div>
                </div>
                
            </Paper>

       
            
            </div>
    );
}

export default CineHome;