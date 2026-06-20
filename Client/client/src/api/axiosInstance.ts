import axios from 'axios';

export const baseUrl = 'http://192.168.1.47:5000';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;