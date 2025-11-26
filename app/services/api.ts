import axios from "axios";

// URL base de la API (Django REST Framework)
export const API_URL = "https://impure-blowzier-ha.ngrok-free.dev";

// Instancia de Axios para reutilizar en toda la app
export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
