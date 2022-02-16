import React from "react";

function Movie({movie, addFavorite, deleteFavorite, id}){
    return(
        <>
                <div className="d-flex  m-3 imgs-wrap">
                    
                    <img className="imgs" src={movie.Poster} alt='movie'></img>
                    <div className="imgsDescription">
                    <button type="button" className="btn btn-warning btnY">{movie.Type}</button>
                        <div className="movieText">
                            <p>{movie.Title}</p>
                            <p>{movie.Year}</p>
                        </div>
                        <button type="button" onClick={() => addFavorite(id)} className="btn btn-success btnP"> + </button>
                        {/* <button type="button" onClick={() => deleteFavorite(id)} className="btn btn-danger btnD"> x </button> */}

                    </div>
                    

                </div>
        </>
    );
    
}

export default Movie;