import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'https://web-portfolio-backend.vercel.app/api';

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const postMessage = async (body: ContactMessagePayload) => {
  return axios.post(`${BASE}/sendMessage`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });
};
