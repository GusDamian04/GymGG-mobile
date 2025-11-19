import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, API_URL } from "./api"; // Importa tu instancia de Axios y URL base

// Define la interfaz de los datos de perfil para tipado seguro (opcional pero recomendado)
export interface ClientProfileData {
    gender: string;
    age: number;
    condition: string;
    goal: string;
    experience: string;
    duration: string;
    // Usamos camelCase aquí para coincidir con la respuesta JSON del Serializer de Django
    fitnessLevel: string; 
    is_complete: boolean;
}

const getAuthToken = async (): Promise<string | null> => {
    return AsyncStorage.getItem("accessToken");
};


export async function getProfile(): Promise<ClientProfileData | null> {
    const token = await getAuthToken();
    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }
    
    try {
        const response = await api.get<ClientProfileData>("/profile/get/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        // Si es 200, devuelve la data (que ahora contiene is_complete)
        return response.data;

    } catch (error: any) {
        // Manejo específico del error 404 (Perfil no encontrado)
        if (error.response && error.response.status === 404) {
            console.log("Perfil no encontrado (Esperado para nuevos usuarios).");
            // Si el perfil no existe (404), devolvemos 'null'
            return null; 
        }
        
        // Manejo de otros errores (403, 500, etc.)
        // ... (Mantener la lógica de manejo de errores existente)
        
        console.error("Error al obtener perfil:", error.response?.data || error);
        throw new Error("Fallo al conectar con el servidor para obtener el perfil.");
    }
}

export async function saveProfile(profileData: ClientProfileData): Promise<ClientProfileData> {
    const token = await getAuthToken();
    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    try {
        const response = await api.post<ClientProfileData>(`${API_URL}/profile/save/`, profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // El backend devuelve los datos del perfil guardado dentro del campo 'profile'
        // Nos aseguramos de devolver solo los datos del perfil para consistencia.
        return response.data; // El Serializer de Django garantiza que la data esté bien mapeada.
        
    } catch (error: any) {
        console.error("Error al guardar perfil:", error.response?.data || error);
        
        // El backend de Django/DRF devuelve los errores de validación en 'error.response.data'
        if (error.response && error.response.status === 400) {
            const validationErrors = JSON.stringify(error.response.data.errors || error.response.data);
            throw new Error(`Error de validación: ${validationErrors}`);
        }

        // Manejo del error 403 (Staff/Superuser)
        if (error.response && error.response.status === 403) {
            const errorMessage = error.response.data?.error || "Acceso denegado (Staff/Superuser).";
            throw new Error(errorMessage);
        }
        
        throw new Error("Fallo desconocido al guardar el perfil.");
    }
}