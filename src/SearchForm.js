import React from "react";
import TextField from "@material-ui/core/TextField";
import useInputState from "./hooks/useInputState";

function SearchForm({addSearch}){
    const [value, handleChange, reset] = useInputState("");
    return(
            <>
            <form onSubmit={e => {
                e.preventDefault();
                addSearch(value);
                reset();
            }}>
             <TextField  id="searchInput" value={value} onChange={handleChange} placeholder="Search Cinemash" variant="standard" InputProps={{ disableUnderline: true }}/>
             
            </form>
            </>
    );
}

export default SearchForm;