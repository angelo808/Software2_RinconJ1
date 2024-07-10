import axios from 'axios';
import queryString from 'query-string';

const API_URL = 'http://localhost:5001/api'; // Asegúrate de que esta URL es correcta

const axiosBase = axios.create({
  baseURL: API_URL,
  paramsSerializer: params => queryString.stringify(params),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosBase;
