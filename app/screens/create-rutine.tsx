import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { createRoutineEndPoint } from "../services/routines";

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function CreateRoutine () {
    
          const router = useRouter()
    
    
  const [routineName, setRoutineName] = useState("");
  const [routineDes, setRoutineDes] = useState("");
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

    const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

const handleCreateRoutine = async () => {
  
  const stored = await AsyncStorage.getItem("user_id");
  console.log("ID del usuario:", stored);

    console.log("descripcion",routineDes)

    try {
        const nuevaRutina = {
            Routine_name: routineName,
            Description: routineDes,
            user:stored
            
        };

        const response = await createRoutineEndPoint(nuevaRutina);

        console.log("Rutina creada:", response);
    } catch (error) {
        console.log("Error creando rutina:", error);
    }
};


      const parts = ["Brazo", "Pierna", "Pantorrilla"];

  // Ejercicios locales por categoría
const rutina: Record<string, { nombre: string; series: string }[]> = {
};

  const toggleExercise = (exercise: string) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(selectedExercises.filter((e) => e !== exercise));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  return (
    <LinearGradient colors={["#0A0A0A", "#1A1A1A"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 25, paddingBottom: 140 }}>
        
      


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


        {/* Input nombre */}
        <Text style={styles.label}>Añade la el nombre de tu rutina</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Musculo en Brazo"
          placeholderTextColor="#aaa"
          value={routineName}
          onChangeText={setRoutineName}
        />
        <Text style={styles.label}>Añade la descripción de tu entrenamiento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Rutina de fuerza Lunes"
          placeholderTextColor="#aaa"
          value={routineDes}
          onChangeText={setRoutineDes}
        />

        {/* Select de categoría */}
        <Text style={styles.label}>¿Qué parte del cuerpo entrenaras?</Text>

          {/* Botón que abre el dropdown */}
      <Pressable style={styles.selectBox} onPress={() => setIsOpen(true)}>
        <Text style={styles.selectText}>
          {selectedPart
            ? selectedPart.charAt(0).toUpperCase() + selectedPart.slice(1)
            : "Seleccionar..."}
        </Text>
      </Pressable>

            <Modal visible={isOpen} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
    <View style={styles.dropdownContainer}>
  {parts.length === 0 ? (
    <Text style={styles.optionText}>No hay ejercicios para mostrar</Text>
  ) : (
    parts.map((item) => (
    <Text style={styles.optionText}>No hay categorias </Text>
      // <TouchableOpacity
      //   key={item}
      //   style={styles.option}
      //   onPress={() => {
      //     setSelectedPart(item);
      //     setIsOpen(false);
      //   }}
      // >
      //   <Text style={styles.optionText}>
      //     {item.charAt(0).toUpperCase() + item.slice(1)}
      //   </Text>
      // </TouchableOpacity>
    ))
  )}
</View>
        </Pressable>
      </Modal>

        {/* Ejercicios */}
        {selectedPart && (
          <>
            <Text style={[styles.label, { marginTop: 20 }]}>
              Ejercicios disponibles
            </Text>

      <ScrollView style={styles.exerciseScroll} contentContainerStyle={styles.exerciseScrollContent}>
  {rutina[selectedPart].map((exercise) => {
  const isSelected = selectedExercises.includes(exercise.nombre);

  return (
    <TouchableOpacity
      key={exercise.nombre}
      onPress={() => toggleExercise(exercise.nombre)}
      style={[
        styles.exerciseItem,
        isSelected && styles.exerciseItemSelected,
      ]}
    >
      <Text
        style={[
          styles.exerciseText,
          isSelected && styles.exerciseTextSelected,
        ]}
      >
        {exercise.nombre}
      </Text>
      <Text style={styles.seriesText}>
        {exercise.series}
      </Text>
    </TouchableOpacity>
  );
})}
</ScrollView>
          </>
        )}

      </ScrollView>

      {/* Botón fijo abajo */}
      <TouchableOpacity 
      onPress={()=> {

          if (!routineName) {
      alert("Escribe un nombre para la rutina");
      return;
    }

    

   if (!selectedPart) {
      alert("En modo dev: viendo el flujo de paginas, iras a my rutinas");
       handleCreateRoutine();  
                   router.replace('/screens/my-routines1')
  
    
            
      return;
    }

        if (selectedExercises.length === 0) {
      alert("Selecciona al menos un ejercicio");
      return;
    }

     handleCreateRoutine();
  
            router.replace('/screens/my-routines1')
      }}
      
      style={styles.fixedButton} activeOpacity={0.9}>
        <LinearGradient
          colors={["#FFD369", "#FF9A00"]}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Guardar rutina</Text>
          <Ionicons name="arrow-forward" size={22} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: "#FFF",
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    color: "rgba(255,255,255,0.7)",
    marginBottom: 8,
    fontSize: 15,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 15,
    borderRadius: 12,
    color: "#FFF",
    marginBottom: 20,
  },
  dropdown: {
    flexDirection: "row",
    gap: 12,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  dropdownItemActive: {
    backgroundColor: "#FFD369",
  },
  dropdownText: {
    color: "#FFF",
    fontSize: 14,
  },
  dropdownTextActive: {
    color: "#000",
    fontWeight: "700",
  },
exerciseScroll: {
  maxHeight: 350,              // ajusta el alto del scroll
  borderRadius: 10,

  paddingHorizontal: 6,
},
exerciseScrollContent: {
  paddingVertical: 8,
},


exerciseItemSelected: {
  backgroundColor: "#4d4d50",
  borderColor: "#fdd835",      // borde dorado al seleccionar
},

exerciseText: {
  fontSize: 16,
  color: "#e6e6e6",
},

exerciseTextSelected: {
  color: "#fdd835",            // texto dorado al seleccionar
  fontWeight: "600",
},
exerciseItem: {
  paddingVertical: 14,
  paddingHorizontal: 16,
  backgroundColor: "#3a3a3c",  // opción alargada
  borderRadius: 8,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: "#5a5a5a",      // borde más claro
},
  exerciseCard: {
    width: "47%",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  exerciseCardSelected: {
    backgroundColor: "#FFD369",
  },

  /* Botón inferior fijo */
  fixedButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom:25
  },
  buttonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
selectBox: {
  padding: 14,
  borderWidth: 1,
  borderColor: "#3a3a3a",   // borde más sutil
  borderRadius: 8,
  backgroundColor: "#1c1c1e", // fondo oscuro estilo iOS
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 6,
  elevation: 3,
},
    selectText: {
    fontSize: 16,
    color: "#ffdf3a",
    fontWeight:"bold"
  },
    overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
dropdownContainer: {
  backgroundColor: "#3a3a3c",   // más claro que #2a2a2d
  marginHorizontal: 40,
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 12,
  elevation: 6,
  borderWidth: 1,
  borderColor: "#5a5a5a",       // borde más claro y visible
  shadowColor: "#000",
  shadowOpacity: 0.35,
  shadowRadius: 8,
},
option: {
  paddingVertical: 14,
  paddingHorizontal: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#7a7a7a", // borde más visible
},
optionText: {
  fontSize: 18,
  color: "#f0f0f0",
},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
  },
  backButton: {
    padding: 1,
  },
  
  backButtonSmall: {
    marginRight: 12,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 10,
  },
    headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 16,
  },
  seriesText: {
  fontSize: 14,
  color: "#666",
  marginTop: 2,
}
});
