import React from "react";
import './App.css';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import  Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";


function CineHome(){
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
                    <form onSubmit={e => {
                        e.preventDefault();
                        alert("send");
                    }}>
                    <TextField  id="searchInput" placeholder="Search Cinemash" variant="standard" InputProps={{ disableUnderline: true }}/>
                    </form>
                    <Button id="navBtn">Movies</Button>
                    <Button id="navBtn">TV Series</Button>
                    <Button id="navBtn">Categories</Button>
                    <Button id="navBtn">Profile</Button>
                    <Button id="logBtn" variant="outlined">Log Out</Button>
                </Toolbar>
            </AppBar>
            
        </Paper>
        </div>
    );
}

export default CineHome;