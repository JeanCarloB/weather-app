import React, { useState } from 'react'
import './styles/weatherStyles.css'
export const WeatherApp = () => {

    const [city, setCity] = useState("");

    const [weatherData, setWeatherData] = useState(null);

    const difKelvin = 273.15;

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';

    const API_KEY = '11ad32fb1cff31cabaaf750e752ce1b4';

    const fetchWeather = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`);

            const data = await response.json();

            setWeatherData(data);
        } catch (e) {
            console.error("Error has ocurred: " + e);
        }
    }

    const handleChangeCity = (e) => {
        setCity(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.length > 0) {
            fetchWeather();
        }
    }

    return (
        <div className='container d-flex flex-column align-items-center'>
            <div className='container bg-primary text-light p-4 mb-3'>
                <h1 className='fs-12 mb-20'>Weather App</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <input type="text" className="form-control"
                        value={city}
                        onChange={handleChangeCity}
                        placeholder='Please insert city...'
                    />
                </div>
                <button type="submit" className="btn btn-danger">Submit</button>
            </form>
            {
                weatherData && (
                    <div className='p-4 bg-secondary text-light rounded border border-white '>
                        <h2 className='fs-12 mb-10'>{weatherData.name}</h2>
                        <p className='mb-2'>Country: {weatherData.sys.country}</p>
                        <p className='mb-2'>Temperatura: {
                            parseInt(weatherData?.main?.temp - difKelvin)}°C</p>
                        <p className='mb-2'>Weather condition: {weatherData.weather[0].description}</p>
                        <img className='w-5 ' src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                    </div>
                )
            }
        </div>
    )
}
