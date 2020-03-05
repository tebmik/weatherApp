import React, {useState, useEffect} from "react";
import FormCity from "./FormCity";
import FormCountry from "./FormCountry";
import FormButton from "./FormButton";

const FormMaster = ({
    onFormSubmit, 
    city, 
    setCity,
    country,
    setCountry}) => {
    

    const onCityChange = (e) => {
        setCity(e.target.value);
        console.log(e.target.value);
    }
    const onCountryChange = (e) => {
        setCountry(e.target.value);
        console.log(e.target.value)
    }

    return(
        <div className="formMaster">
            <form 
                onSubmit={onFormSubmit}
                className="form">
                <FormCity 
                    onCityChange={onCityChange}
                    city={city}
                />
                <FormCountry 
                    onCountryChange={onCountryChange}
                    country={country}
                />
                <FormButton />
            </form>
        </div>
    );
};

export default FormMaster;