import React from "react";
// import Forecast from "./Forecast";

const WeatherDisplay = ({
    city,
    country,
    weather,
    icon,
    celsius,
    minDeg,
    maxDeg,
    windSpeed,
    day}) => {

    

    const fontStyle = {
        color:"#fff",
        fontFamily: "Open Sans, Roboto, sans-serif",
    };

    const weatherGrid = {
        maxWidth:"150px",
        fontSize:"1.2em",
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        justifySelf:"center",
        gridGap:"20px",
    };
    const celStyle = {
        color:"#fff",
        fontWeight:400,
        fontSize:"5em",
        marginTop:"20px",
        paddingLeft:"20px",
        fontFamily: "Montserrat, Roboto, sans-serif",
        fontWeight:"300"
    };
    const minMaxGrid = {
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr",
        fontSize:"2em",
        justifySelf:"center",
        gridGap:"40px",
        fontFamily: "Montserrat, Roboto, sans-serif",
    };

    const pStyle = {
        fontSize:"14px"
    };

    return (
        <div className="weatherDisplay">
            <h1 style={fontStyle}>{city}<span> {country}</span></h1>     
            <h1 style={weatherGrid}>
                <i 
                    style={{color:"#fff"}} 
                    className={`wi ${icon} display-1`}>
                </i>
                <p style={fontStyle}>{weather}</p>
            </h1>
            {celsius ? <h1 
                        style={celStyle}
                        className="
                            animated
                            fadeInUp
                            delay-2s">{celsius}&deg;</h1> : null}
            <div style={minMaxGrid}>
                {minDeg ? <span 
                            style={fontStyle}
                            className="
                                animated 
                                fadeInLeft
                                delay-5s">{minDeg}&deg; <p style={pStyle}>Min</p></span> : null}
                {minDeg && maxDeg ? <p></p> : null}
                {maxDeg ? <span 
                            style={fontStyle}
                            className="
                                animated 
                                fadeInLeft
                                delay-5s">{maxDeg}&deg; <p style={pStyle}>Max</p></span> : null}
            </div>
            <div>
                {windSpeed ? <p style={fontStyle}>Wind Speed <span style={fontStyle}>{windSpeed}mph</span></p> : null}
            </div>
        </div>
    );
};

export default WeatherDisplay;