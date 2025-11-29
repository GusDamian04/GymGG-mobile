import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

// Cambiar dependiendo de la URL de ngrok que se genere
const API_URL = "https://impure-blowzier-ha.ngrok-free.dev";

export async function loginUser(email: string, password: string) {
    try {
        const response = await api.post(`${API_URL}/useraccount/login/`, {
            email: email,
            password: password,
            client: 'mobile',
        });

        let isStaff = response.data.is_staff;
        let isSuperuser = response.data.is_superuser;
        const { is_staff, is_superuser } = response.data;
        
        if(typeof is_staff !== 'undefined' && response.data.user) {
            isStaff = response.data.user.is_staff;
            isSuperuser = response.data.user.is_superuser;
        }

        if(isStaff === true || isSuperuser === true) {
            return {
                error: true,
                message: "Acceso denegado. Utiliza la aplicación móvil solo con cuentas de cliente."
            };
            // throw new Error("Acceso denegado. Utiliza la aplicación móvil solo con cuentas de cliente.");
        }

        const access = response.data.access || response.data.access_token;
        const refresh = response.data.refresh || response.data.refresh_token;
        console.log("soy el responde con info",response.data)
        if (!access || !refresh) {
            console.error("Tokens no encontrados en la respuesta:", response.data);
            throw new Error("Error: el servidor no devolvió tokens válidos.");
        }

        await AsyncStorage.setItem("accessToken", access);
        await AsyncStorage.setItem("refreshToken", refresh);
        await AsyncStorage.setItem("userData", JSON.stringify(response.data))

        api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

        return response.data;
    } catch (error: any) {
        console.error("Error al iniciar sesión:", error.response?.data || error);
        throw new Error(
            error.response?.data?.detail || "Error al iniciar sesión"
        );
    }
}
