import React from "react";
import Movie from "./Movie";


function MovieList({movies}){
    return(
        <>
            
            {movies.map((movie, index) => (
                <Movie movie={movie}/>
            ))}
               
            
        </>
    );
    
}

export default MovieList;