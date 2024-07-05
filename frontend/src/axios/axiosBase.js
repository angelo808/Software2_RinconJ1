import axios from "axios";
import queryString from "query-string";
import { API_URL } from "../constants";

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});

// Interceptor de solicitud para agregar cualquier header globalmente (por ejemplo, tokens de autenticación)
axiosInstance.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar headers, como tokens de autenticación, si es necesario
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores globalmente
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Aquí puedes manejar errores de respuesta globalmente
    // Por ejemplo, redirigir a la página de inicio de sesión si hay un error 401
    // if (error.response.status === 401) {
    //   window.location.href = '/iniciar-sesion';
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;


