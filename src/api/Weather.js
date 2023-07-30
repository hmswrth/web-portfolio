import axios from 'axios';

const BASE = process.env.REACT_APP_WEATHER_URL
const KEY = process.env.REACT_APP_WEATHER_KEY

export const getWeatherData = async () => {
    return axios.get(`${BASE}weather?q=bangalore&units=metric&APPID=${KEY}`)
}