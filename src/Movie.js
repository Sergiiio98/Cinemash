import React from "react";

function Movie({movie}){
    return(
        <>
                <div className="d-flex  m-3 imgs-wrap">
                    
                    <img className="imgs" src={movie.Poster} alt='movie'></img>
                    <div className="imgsDescription">
                    <button type="button" class="btn btn-warning">{movie.Type}</button>

                      
                        <p>{movie.Title}</p>
                        <p>{movie.Year}</p>
                    </div>
                    

                </div>
        </>
    );
    
}

export default Movie;