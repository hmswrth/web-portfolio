import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'https://web-portfolio-backend.vercel.app/api';

export const postMessage = async (body) => {
  return axios.post(`${BASE}/sendMessage`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });
};
