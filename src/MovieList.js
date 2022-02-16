import React from "react";
import Movie from "./Movie";


function MovieList({movies, addFavorite, deleteFavorite}){
    return(
        <>
            
            {movies.map((movie, index) => (
                <Movie movie={movie} addFavorite={addFavorite} deleteFavorite={deleteFavorite} id={movie.imdbID}/>
            ))}
               
            
        </>
    );
    
}

export default MovieList;