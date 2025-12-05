
import { View, Text, Animated, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ToastAndroid } from "react-native";
import { getAllRoutines } from '../services/routines'
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function MyRoutines() {

  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedRoutineId, setSelectedRoutineId] = useState<any>()
  const [selectedRoutine, setSelectedRoutine] = useState<any>()


function tiempoTranscurrido(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  const hoy = new Date();

  const diffMs = hoy.getTime() - fecha.getTime();
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias < 1) {
    return "hace 0 días";
  }

  if (diffDias === 1) {
    return "hace 1 día";
  }

  const semanas = Math.floor(diffDias / 7);

  if (semanas >= 1) {
    return semanas === 1
      ? "hace 1 semana"
      : `hace ${semanas} semanas`;
  }

  return `hace ${diffDias} días`;
}



  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  const [rutine,setRoutine]= useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRoutine = async () => {
            try {
                const data = await getAllRoutines(); // llamaado la API desde el archivo routine.ys

                const mapped = data.map((item:any)=> ({
                  id: item.id,
                  nombre: item.Routine_name,
                  descripcion: item.Description ?? "Sin descripción",
                   icono:item.icono ?? "fitness",
                  ultimaVez:tiempoTranscurrido(item.Last_time_done),
                  vecesCompletada:item.Times_done,

                }))
                console.log(mapped[0].ultimaVez)
                setRoutine(mapped);  
                
                                if(data.length>0){
                                  console.log(data.length>0)
                                  AsyncStorage.setItem("user_id",data[0].user)
                                  console.log("si",data[0].user)
                                }
                                //  guardas la data
            } catch (error) {
                console.log("Error cargando rutina:", error);
            } finally {
                setLoading(false);
            }
        };

        loadRoutine();
    }, []); //  solo al montar el componente

   if (loading) {
        return <Text>Cargando...</Text>;
    }

  // const confirmDelete = () => {
  //   // Aquí iría la lógica para eliminar la rutina
  //   console.log('Eliminando rutina:', selectedRoutineId)
  //   setShowDeleteConfirm(false)
 
  // }

try {
  // Validar primero si el ID existe
  if (!selectedRoutineId) {
  
  }
  // Buscar la rutina por ID
  // selectedRoutine = rutinasGuardadas.find(r => r.id === selectedRoutineId);


} catch (error: any) {
  console.error("Error al obtener la rutina seleccionada:", error.message);

  ToastAndroid.show(
    error.message || "Error inesperado",
    ToastAndroid.SHORT
  );

}

  return (
    <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
          <ScrollView contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.replace("/screens/home-screen")}
                activeOpacity={0.8}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="#FFC107" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Mis Rutinas</Text>
            </View>

            {/* Botón Generar Nueva Rutina */}
            <TouchableOpacity
              // onPress={() => router.push('/generator')}
              activeOpacity={0.8}
              style={styles.generateButton}
            >
         
              
          {/* Botón Principal de Creación */}
                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={()=>{router.replace("/screens/create-rutine")}}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={['#2E8B57', '#3CB371']} // Un color diferente para CTA principal
                            style={styles.gradient}
                        >
                            <Ionicons name="add-circle-outline" size={24} color="white" />
                            <Text style={styles.createButtonText}>
                                Generar Rutina Personalizada
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                          
            </TouchableOpacity>

            {/* Título Rutinas Guardadas */}
            <Text style={styles.sectionTitle}>Rutinas Guardadas</Text>

            {/* Lista de Rutinas */}
              <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

              
            <View style={styles.routinesList}>
        

              
              {
              
  //             rutine.length===0 ?(
  //                <Text style={{ textAlign: "center", marginTop: 20 }}>
  //   No hay rutinas disponibles
  // </Text>
  //             ):(
                
              
              
              rutine.map((rutina) => (
  <TouchableOpacity
    key={rutina.id}
    onPress={() => {setSelectedRoutineId(rutina.id);
   setSelectedRoutine(rutina)
    }

    }
    activeOpacity={0.8}
    style={[
      styles.routineCard,
      selectedRoutineId === rutina.id && styles.routineCardSelected
    ]}
  >
    <View style={styles.routineContent}>
      <View style={styles.routineIconContainer}>
        <Ionicons name={rutina.icono} size={28} color="#FFC107" />
      </View>

      <View style={styles.routineInfo}>
        <View style={styles.routineHeader}>
          <View style={styles.routineTitleContainer}>
            <Text style={styles.routineName}>{rutina.nombre}</Text>
            <Text style={styles.routineDescription}>{rutina.descripcion}</Text>
          </View>
        </View>

        <View style={styles.routineFooter}>
          <Text style={styles.routineDuration}>{rutina.duracion}</Text>
          <View style={styles.routineStats}>
            <Text style={styles.routineStatText}>✓ {rutina.vecesCompletada} veces</Text>
            <Text style={styles.routineStatText}>{rutina.ultimaVez}</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
)
)} 

            </View>
            </ScrollView>
            <TouchableOpacity
    style={styles.fixedButton}
    onPress={() => {
      
    
      if (!selectedRoutine) return ToastAndroid.show("Selecciona una rutina primero", ToastAndroid.SHORT);

      router.push(
      {
      pathname:"/screens/routineProgress",
      params:{
        nombre:selectedRoutine?.nombre,
        Ejercicios: selectedRoutine?.Ejercicios,
        id:selectedRoutine?.id
      }
    })
  }}
    activeOpacity={0.9}
>
    <LinearGradient
        colors={['#FFD369', '#FF9A00']} // Amarillo → Naranja
        style={styles.gradient}
    >
        <Text style={styles.createButtonText}>
            Empezar mi rutina
        </Text>

        <Ionicons
            name="arrow-forward"
            size={22}
            color="white"
        />
    </LinearGradient>
</TouchableOpacity>

            {/* Mensaje cuando no hay rutinas */}
            {rutine.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aún no tienes rutinas guardadas</Text>
                {/* <TouchableOpacity
                  //onPress={() => router.push('/generator')}
                  activeOpacity={0.8}
                  style={styles.emptyButton}
                >
                  <Text style={styles.emptyButtonText}>Crear mi primera rutina</Text>
                </TouchableOpacity> */}
              </View>
            )}
          </ScrollView>
        </Animated.View>

        {/* Modal de confirmación de eliminación */}

      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 16,
  },
  generateButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  generateGradient: {
    borderRadius: 16,
  },
  generateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  generateIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  generateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  generateSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#AAA',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  routinesList: {
    paddingHorizontal: 16,
  },
  routineCard: {
    backgroundColor: '#1F1F1F',
    borderColor:"#1F1F1F",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth:2
  
  },
  routineContent: {
    flexDirection: 'row',
    padding: 16,
  },
  routineIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routineInfo: {
    flex: 1,
    marginLeft: 16,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  routineTitleContainer: {
    flex: 1,
  },
  routineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  routineDescription: {
    fontSize: 13,
    color: '#AAA',
  },
  difficultyBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    height: 24,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFF',
  },
  routineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routineDuration: {
    fontSize: 13,
    color: '#AAA',
  },
  routineStats: {
    flexDirection: 'row',
    gap: 16,
  },
  routineStatText: {
    fontSize: 11,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2A2A2A',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
    gradient: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
  },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

  createButton: {
      width: '100%',
      height: 60,
      borderRadius: 30,
      overflow: 'hidden',
      marginBottom: 12,
      shadowColor: '#FFC107',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
  },
  fixedButton: {
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,
  height: 60,
  borderRadius: 30,
  overflow: "hidden",

  shadowColor: "#FF9A00",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.35,
  shadowRadius: 8,
  elevation: 8,
},
routineCardSelected: {
  borderWidth: 2,
  borderColor: "#FFC107",
  backgroundColor: "#2A2A2A",
  
},
})