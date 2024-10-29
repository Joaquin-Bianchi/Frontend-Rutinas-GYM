import axios from "axios";
import { useNavigate } from "react-router-dom";

// Crear una instancia de axios con la configuración base
const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3002",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para requests - añade el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // o donde guardes tu token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses - maneja errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      const navigate = useNavigate();
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
