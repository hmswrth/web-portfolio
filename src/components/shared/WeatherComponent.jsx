import React, { useState } from 'react'
import './Weather.css'
import { useEffect } from 'react'
import { getWeatherData } from '../../api/Weather'

const WeatherComponent = () => {
   const [weatherData, setWeatherData] = useState(null)

   const getBangaloreWeather = async () => {
      try {
         const res = await getWeatherData()
         console.log(res)
         setWeatherData(res.data)
      } catch (error) {
         console.error(error)
      }
   }

   // onMount hit the weather API
   useEffect(() => {
      if(!weatherData) getBangaloreWeather()
   }, [])
   return (
      <>
         {weatherData && (
            <div className='weatherWrapper'>
               <div className="cardContainer">
                  <div className="card">
                     <p className="city">{weatherData?.name}</p>
                     <p className="weather">{weatherData?.weather[0]?.description}</p>
                     <img src={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`} alt={weatherData?.weather[0]?.description} />
                     <p className="temp">{parseInt(weatherData?.main?.temp)}°C</p>
                     <div className="minmaxContainer">
                        <div className="min">
                           <p className="minHeading">Min</p>
                           <p className="minTemp">{parseInt(weatherData?.main?.temp_min)}°C</p>
                        </div>
                        <div className="max"><p className="maxHeading">Max</p>
                           <p className="maxTemp">{parseInt(weatherData?.main?.temp_max)}°C</p></div>
                     </div>

                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default WeatherComponent