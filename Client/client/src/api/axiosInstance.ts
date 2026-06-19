import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.47:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
