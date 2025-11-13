import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

// Cambiar dependiendo de la URL de ngrok que se genere
const API_URL = "https://amanda-unmagical-blaise.ngrok-free.dev";

export async function loginUser(email: string, password: string) {
    try {
        const response = await api.post(`${API_URL}/api/auth/login/`, {
            email: email,
            password: password,
        });
        const access = response.data.access || response.data.access_token;
        const refresh = response.data.refresh || response.data.refresh_token;

        if (!access || !refresh) {
            console.error("Tokens no encontrados en la respuesta:", response.data);
            throw new Error("Error: el servidor no devolvió tokens válidos.");
        }

        await AsyncStorage.setItem("accessToken", access);
        await AsyncStorage.setItem("refreshToken", refresh);

        api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

        return response.data;
    } catch (error: any) {
        console.error("Error al iniciar sesión:", error.response?.data || error);
        throw new Error(
            error.response?.data?.detail || "Error al iniciar sesión"
        );
    }
}
