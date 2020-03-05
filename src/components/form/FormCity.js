import React from "react";
import TextField from '@material-ui/core/TextField';

const color ={
    color:"#fff"
}
const FormCity = ({onCityChange, city}) => {
    return(
        <TextField
            id="standard-basic"
            onChange={onCityChange}
            type="text"
            label="City"
            value={city}
            required
            className="input cityInput">    
        </TextField>
    );
};

export default FormCity;