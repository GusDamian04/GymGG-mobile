import axios from "axios";

// URL base de la API (Django REST Framework)
export const API_URL = "http://192.168.1.110:8000";

// Instancia de Axios para reutilizar en toda la app
export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
