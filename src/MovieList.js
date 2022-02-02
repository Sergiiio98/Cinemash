import React from "react";
import Movie from "./Movie";


function MovieList({movies, addFavorite}){
    return(
        <>
            
            {movies.map((movie, index) => (
                <Movie movie={movie} addFavorite={addFavorite} id={movie.imdbID}/>
            ))}
               
            
        </>
    );
    
}

export default MovieList;