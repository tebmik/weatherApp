import React from "react";
import Button from '@material-ui/core/Button';

const FormButton = () => {
    return(
        <Button 
            type="submit"
            className="submitButton" 
            variant="contained"   
            color="primary"
        >Get Weather
        </Button>
    );
};

export default FormButton;