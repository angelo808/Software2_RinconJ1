import axios from 'axios';
import queryString from 'query-string';
import { API_URL } from '../constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
  paramsSerializer: params => queryString.stringify(params),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});

export default axiosInstance;