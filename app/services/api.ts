import axios from "axios";

// Cambiar dependiendo de la URL de ngrok que se genere
export const API_URL = "https://amanda-unmagical-blaise.ngrok-free.dev";

// Instancia de Axios para reutilizar en toda la app
export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
