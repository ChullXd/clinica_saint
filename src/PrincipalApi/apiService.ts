import axios from "axios";

const API_BASE_URL = "https://localhost:44345/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Detalles del error de la API:", {
      mensaje: error.message,
      respuesta: error.response
        ? {
            estado: error.response.status,
            datos: error.response.data,
            headers: error.response.headers,
          }
        : null,
    });
    return Promise.reject(error);
  }
);


