import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from 'expo-router'
import { createRoutineHistoryData, updateRoutine } from "../services/routines";


export default function CompletedRoutine() {
    const {TiempoTrans,idRoutine} =useLocalSearchParams()

    const [loading, setLoading] = useState(false);

    const tiempo=Number(TiempoTrans)

    const formatTime = (secs:number) => {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};


  const handleUpdateRoutine = async () => {
    try{
      setLoading(true)
      const rutinaActualizada= {
         Last_time_done :new Date().toISOString(), //(es del dateTimefield de djnago)
          Times_done: 5// integer
      };
        await updateRoutine(Number(idRoutine), rutinaActualizada);

          const Historialrutina= {
         routine :Number(idRoutine) ,
        Date_realization: new Date().toISOString(),
          Time_to_done:tiempo
      };
      await createRoutineHistoryData(Historialrutina);

      alert(" guarde historial y actualize")

        router.push("/screens/home-screen")
    } catch (error){
        console.log("Error actualizando rutina:", error);
    }  finally{
     setLoading(false)
  }

  }


  
 
  
  
 


  const router=useRouter();
  return (
    <View style={styles.container}>

    <Ionicons
        name="trophy"
        size={100}
        color="#FFD700"
        style={styles.trophyIcon}
      />


      <Text style={styles.title}>¡Rutina Completada!</Text>
      <View style={styles.card}>
        <View style={styles.infoContainer}>

          {/* IZQUIERDA */}
          <View style={styles.leftColumn}>
            <Text style={styles.leftText}>Duración total</Text>
            <Text style={styles.leftText}>Tiempo descansado</Text>
            <Text style={styles.leftText}>Series completas</Text>
            <Text style={styles.leftText}>Ejercicios hechos</Text>
          </View>

          {/* DERECHA */}
          <View style={styles.rightColumn}>
            <Text style={styles.rightText}>{formatTime(tiempo)}</Text>
            <Text style={styles.rightText}>7:10 min</Text>
            <Text style={styles.rightText}>12</Text>
            <Text style={styles.rightText}>5</Text>
          </View>

        </View>
      </View>


            <TouchableOpacity
    style={styles.fixedButton}
    onPress={() => {
      handleUpdateRoutine();
  }}
    activeOpacity={0.9}
    disabled={loading}
>
    <LinearGradient
        colors={['#FFD369', '#FF9A00']} // Amarillo → Naranja
        style={styles.gradient}
    >
      {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <>
        <Ionicons name="home" size={22} color="white" />
        <Text style={styles.createButtonText}>Finalizar</Text>
      </>
    )}
    </LinearGradient>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C", // fondo negro
    justifyContent: "center",
    alignItems: "center",
  },
    trophyIcon: {
   marginBottom:20,
    zIndex: 2,
  },

  card: {
    width: "85%",
    paddingVertical:20,
    paddingHorizontal:20,
    borderRadius: 15,
    backgroundColor: "#2A2A2A",
    borderWidth: 2,            
    borderColor: "#4A4A4A",  
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "#ccc",
    fontSize: 16,
  },
    fixedButton: {
  position: "absolute",
  bottom: 50,
  left: 20,
  right: 20,
  height: 60,
  borderRadius: 30,
  overflow: "hidden",
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
      infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal:1
  },

  
  leftColumn: {
    gap: 10,
    margin:10
  },

  rightColumn: {
    alignItems: "flex-end",
    gap: 10,
    margin:10

  },

  leftText: {
    color: "#B0B0B0",
    fontSize: 16,
    marginTop:5
  },

  rightText: {
    color: "#FFD700", // amarillo
    fontSize: 16,
    fontWeight: "bold",
  }

  }
);
