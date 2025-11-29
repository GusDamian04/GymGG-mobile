import { api } from "./api";

const API_URL = "https://impure-blowzier-ha.ngrok-free.dev";

export async function getAllMemberships() {
    try {
        const response = await api.get(`${API_URL}/membership/`);
        console.log(response)
        return response.data;
    } catch (error: any) {
        console.log("Error al obtener membership:", error.response?.data || error);
        throw new Error("No se pudo cargar el membership");
    }
}
