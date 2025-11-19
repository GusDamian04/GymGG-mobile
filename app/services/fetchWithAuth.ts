import AsyncStorage from "@react-native-async-storage/async-storage";

// Asume que estas constantes existen en tu proyecto
const API_BASE_URL = " https://amanda-unmagical-blaise.ngrok-free.dev";
const AUTH_TOKEN_KEY = "user_auth_token"; // Clave donde guardas el token JWT

/**
 * Realiza una solicitud fetch incluyendo el token de autenticación del usuario.
 */
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    
    if (!token) {
        throw new Error("No authenticated token found. Please sign in.");
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Asume esquema Bearer Token
        ...options.headers,
    };

    const url = `${API_BASE_URL}${endpoint}`;

    return fetch(url, {
        ...options,
        headers,
    });
}