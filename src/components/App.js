import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import "weather-icons/css/weather-icons.css";
import { API_KEY } from "../config/keys";
import FormMaster from "./form/FormMaster";
import WeatherDisplay from "./weather/WeatherDisplay";
import "./app.scss";


const App = () => {
    // states for main on day display 
    const [ city, setCity ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ weather, setWeather ] = useState([]);
    const [ icon, setIcon ] = useState([]);
    const [ displayedCity, setDisplayedCity ] = useState([]);
    const [ displayedCountry, setDisplayedCountry] = useState([]);
    const [ celsius, setCelsius ] = useState(undefined);
    const [ minDeg, setMinDeg ] = useState(undefined);
    const [ maxDeg, setMaxDeg ] = useState(undefined);
    const [ windSpeed, setWindSpeed ] = useState(undefined);

    // state for weekly forecast when addedd 
    const [ day, setDay ] = useState(undefined);

    const WeatherIcon = {
        Thunderstorm:"wi-thunderstorm",
        Drizzle:"wi-sleet",
        Rain:"wi-storm-showers",
        Snow:"wi-snow",
        Atmosphere:"wi-fog",
        Clear:"wi-day-sunny",
        Clouds:"wi-day-fog"
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setCity(e.target.value);
        setCountry(e.target.value);
        console.log(city, country);
        setCity("");
        setCountry("");
        getWeather();
    };

    // changing into Celicius

    const calCelsius = temp => {
        let cell = Math.floor(temp - 273.15)
        return cell
    };

    //get weather icons 
    const getWeatherIcon = (icons, rangeID) => {
        switch(true){
            case rangeID >= 200 && rangeID <= 232:
                setIcon(WeatherIcon.Thunderstorm);
            break;
            case rangeID >= 300 && rangeID <= 321:
                setIcon(WeatherIcon.Drizzle);
            break;
            case rangeID >= 500 && rangeID <= 531:
                setIcon(WeatherIcon.Rain);
            break;
            case rangeID >= 600 && rangeID <= 622:
                setIcon(WeatherIcon.Snow);
            break;
            case rangeID >= 701 && rangeID <= 781:
                setIcon(WeatherIcon.Atmosphere);
            break;
            case rangeID === 800:
                setIcon(WeatherIcon.Clear);
            break;
            case rangeID >= 801 && rangeID <= 804:
                setIcon(WeatherIcon.Clouds);
            break;
            default:
                setIcon(WeatherIcon.Clouds);
        };
    };
    
    
    const animate = document.querySelector(".weatherDisplay");
    const reAnimation = () => {
        animate.classList.add('animated', 'zoomIn')
        setInterval(() => {
            animate.classList.remove('animated', 'zoomIn')
        }, 2500);
    };

    const getWeather = async () => {
        reAnimation()
        let baseURL = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
        );
        let response = await baseURL.json();
        console.log(response)
        setDisplayedCity(response.name);
        setDisplayedCountry(response.sys.country);
        setWeather(response.weather[0].main);
        getWeatherIcon(WeatherIcon, response.weather[0].id);
        setCelsius(calCelsius(response.main.temp));
        setMinDeg(calCelsius(response.main.temp_min));
        setMaxDeg(calCelsius(response.main.temp_max));
        setWindSpeed(response.wind.speed);
        console.log(response.weather[0].icon);
        getForecast()
    };

    const getForecast = async () => {
        let baseURL = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}`
        );
        let response = await baseURL.json();
        console.log(response.list);
        console.log(response.list[0].dt_txt);
        setDay(response.list[0].dt_txt);
    }

    return (
        <>
            <div className="App">
                <div className="main">
                    <FormMaster 
                        onFormSubmit={onFormSubmit} 
                        city={city}
                        setCity={setCity}
                        country={country}
                        setCountry={setCountry}
                    />
                    <div className="weatherDisplay">
                        <WeatherDisplay 
                            weather={weather}
                            city={displayedCity}
                            country={displayedCountry}
                            icon={icon}
                            celsius={celsius}
                            minDeg={minDeg}
                            maxDeg={maxDeg}
                            windSpeed={windSpeed}
                            day={day}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;