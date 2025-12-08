import { api } from "./api";


const API_URL = "https://impure-blowzier-ha.ngrok-free.dev";

//obtener todas las rutinas independiente mente del usuario
export async function getAllRoutines() {
    try {
        const response = await api.get(`${API_URL}/routines/routines`);
        return response.data;
    } catch (error: any) {
        console.log("Error al obtener rutinas:", error.response?.data || error);
        throw new Error("No se pudo cargar las rutinas");
    }
}
// crear nueva rutina con la info y necesario del form
export async function createRoutineEndPoint(data: any) {
    try {
        const response = await api.post(`${API_URL}/routines/routines/`, data);
        return response.data;
    } catch (error: any) {
        console.log("Error al crear rutina:", error.response?.data || error);
        throw new Error("No se pudo crear la rutina");
    }
}

// solo optener membrecias del logeado
export async function getRoutineById(id: number) {
    try {
        const response = await api.get(`${API_URL}/routines/${id}/`);
        return response.data;
    } catch (error: any) {
        console.log("Error al obtener rutina:", error.response?.data || error);
        throw new Error("No se pudo obtener la rutina");
    }
}

// actualizaremos las rutinas??

export async function updateRoutine(id: number, data: any) {
    try {
        const response = await api.patch(`${API_URL}/routines/routines/${id}/`, data);
        return response.data;
    } catch (error: any) {
        console.log("Error al actualizar rutina:", error.response?.data || error);
        throw new Error("No se pudo actualizar la rutina");
    }
}

// elimanermos las rutinas??
export async function deleteRoutine(id: number) {
    try {
        await api.delete(`${API_URL}/routines/${id}/`);
        return true;
    } catch (error: any) {
        console.log("Error al eliminar rutina:", error.response?.data || error);
        throw new Error("No se pudo eliminar la rutina");
    }
}

//_______________funciones de Historial__________________


export async function createRoutineHistoryData(data:any){
      try {
        const response = await api.post(`${API_URL}/routines/routine-history/`, data);
        return response.data;
    } catch (error: any) {
        console.log("Error al crear rutina:", error.response?.data || error);
        throw new Error("No se pudo guardar el historial de  rutina");
    }  
}

export async function getHistorialRoutineDataPerMonth(){
    try{
            const response = await api.get(`${API_URL}/routines/routine-history/all_months`);
            return response.data;
        
    } catch (error:any){
        console.log("Error al cargar Info del historial",error.response?.data || error);
        throw new Error("no se cargo el historial")
    }
}
export async function getHistorialRoutineDataPerYeak(){
    try{
            const response = await api.get(`${API_URL}/routines/routine-history/this_week`);
            return response.data;
        
    } catch (error:any){
        console.log("Error al cargar Info del historial",error.response?.data || error);
        throw new Error("no se cargo el historial")
    }
}