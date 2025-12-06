import {api} from "./api";

const API_URL= "https://impure-blowzier-ha.ngrok-free.dev";

export async function getExercises(){
try {
    const response = await api.get(`${API_URL}/routines/exercises-recommendation`);
    return response.data;
    
}catch (error: any) {
        console.log("Error al obtener Ejercicios:", error.response?.data || error);
        throw new Error("No se pudo cargar los ejercicios");
    }
}
