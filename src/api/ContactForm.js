import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL

export const postMessage = async (body) => {
    console.log(BASE)
    return axios.post(`${BASE}/sendMessage`, body)
}