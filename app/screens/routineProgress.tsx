import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect,useRef  } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress"; // arriba de todo, junto con otros imports
import { Dimensions } from "react-native"; // nuevo import
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { getExercisesByIds } from "../services/exercises";



export default function RoutineProgressScreen() {
  
  const router = useRouter();
  
  const { nombre,ejercios, id,cantidad } = useLocalSearchParams();

  const cantidadNum= Number(cantidad);
  const cantidadStr = Array.isArray(ejercios) ? ejercios[0] : ejercios;

// 2. Convertir string a array de números
const exerciseIds: number[] = cantidadStr
  ? cantidadStr.split(",").map((id) => Number(id))
  : [];


  const screenWidth = Dimensions.get("window").width - 40; // 40 es el padding del ScrollView
  //controlador de barra general en base a a ejercicios 


  const [generalProgress, setGeneralProgress] = useState(1/cantidadNum);
  const [generalBar, setGeneralBar] = useState(1);
  


  //controlador de barra se serie actual
  const [progress, setProgress] = useState(0); // estado inicial de la barra (0%)
  const [serieActual, setSerieActual] = useState(0);


  const [serieMostrar, setSerieMostrar] = useState(1);

  const [ejercicios,setEjercicio] = useState<any>();


  

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0); // en segundos
  const [restTime, setRestTime] = useState<number>(10 * 60); // 10 minutos en segundos

  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);



  const totalIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

const formatTime = (secs:number) => {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};


useEffect(() => {
  if (!isPaused) return; 

  intervalRef.current = setInterval(() => {
    setRestTime(prev => {
      if (prev <= 0) {
        // se acabó el descanso → reanuda total
        setIsPaused(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, [isPaused]);

useEffect(() => {
  async function loadExercises() {
    try {
      const exercises = await getExercisesByIds(exerciseIds);
      setEjercicio(exercises);
      setLoading(false);
      console.log("carque",exercises)
    } catch (error) {
      console.log(error);
    }
  }+
  loadExercises();
}, []);

const series=ejercicios?.[currentIndex]?.series;
const increaseProgress = () => {
  if (serieActual < series) {
    const nextSerie = serieActual + 1;

    setSerieActual(nextSerie);
    setProgress(nextSerie / series); // esto llena proporcionalmente
  }
};

const increaseGeneralProgress= () => {
  if(generalBar<cantidadNum){
    const siguenteEjer= generalBar+1;

    setGeneralBar(siguenteEjer)
    setGeneralProgress(siguenteEjer/cantidadNum);

  }
}

useEffect(() => {
  totalIntervalRef.current = setInterval(() => {
    setTotalTime(prev => (isPaused ? prev : prev + 1));
  }, 1000);

   return () => {
    if (totalIntervalRef.current) clearInterval(totalIntervalRef.current);
  };
}, [isPaused]);


const toggleRest = () => {
  setIsPaused(prev => !prev);
};


useEffect(() => {
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, []);


  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => { 
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>¿Preparado?</Text>
      </View>
    );
  }
  const seriestotales= ejercicios?.[currentIndex].series;
  const seriecompleta=serieActual==seriestotales;


  return (
    <View style={{flex:1, marginBottom:0, }}>
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {router.replace("/screens/my-routines1")}} style={styles.backButton}>
          <View style={{flexDirection:"row"}}>

                <Ionicons name="arrow-back" size={24} style={{marginTop:25, marginRight:20}} color="#FFC107" />
          <Text style={styles.backArrow2}>{nombre ? "Rutina de "+String(nombre): "Cargando"}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}></Text>
      </View>

      {/* Contenido */}
      
    <View style={styles.progressContainer}>
        <View style={styles.progressLabelsRow}>

        <Text style={styles.progressLabel}>Progreso general</Text>
        <Text style={styles.progressLabel}> {generalBar}/{cantidadNum}</Text>
        </View>

  <Progress.Bar
    progress={generalProgress}           // porcentaje de progreso (0 a 1)
    width={screenWidth}             // se adapta al ancho del contenedor
    height={10}              // altura de la barra
    borderRadius={12}        // bordes redondeados
    color="#FFD700"          // amarillo
    unfilledColor="#4a4a4a" // fondo gris oscuro
    borderWidth={0}          // sin borde extra
    animated={true}          // animación al cargar
  />
</View>

    <View style={styles.progressContainer}>
        <View style={styles.progressLabelsRow}>

        <Text style={styles.progressLabel}>serie actual</Text>
        <Text style={styles.progressLabel}> {serieActual}/{ejercicios?.[currentIndex]?.series}</Text>
        </View>
  <Progress.Bar
    progress={progress}           // porcentaje de progreso (0 a 1)
    width={screenWidth}             // se adapta al ancho del contenedor
    height={10}              // altura de la barra
    borderRadius={10}        // bordes redondeados
    color="#FFD700"          // amarillo
    unfilledColor="#4a4a4a" // fondo gris oscuro
    borderWidth={0}          // sin borde extra
    animated={true}          // animación al cargar
  />
</View>

<View style={styles.timerCard}>
  {/* Izquierda */}
  <View style={styles.timerSection}>
    <Text style={styles.timerIcon}>⏱</Text>
    <Text style={styles.timerIcon2}>Total</Text>
    <Text style={styles.timerText}>{formatTime(totalTime)}</Text>
  </View>

  {/* Derecha */}
  <View style={styles.timerSection}>
      <TouchableOpacity onPress={toggleRest}>
    <Text style={styles.timerIcon}>
        {isPaused ? "⏸" : "▶️"}
        </Text>
      </TouchableOpacity>

    <Text style={styles.timerIcon2}>Descanso</Text>
    <Text style={styles.timerText}>{formatTime(restTime)}</Text>
  </View>
</View>


    
<View style={styles.timerCard2}>
  <Text style={styles.serieTitle}>Serie {serieMostrar}</Text>
  <Text style={styles.exerciseName}>
  {ejercicios?.[currentIndex]?.name || "cargando ejercicio"}
    </Text>
  <Text style={styles.repsText}>{ejercicios?.[currentIndex].series} series x {ejercicios?.[currentIndex]?.repetitions} reps</Text>
</View>
    </ScrollView>

<View style={styles.fixedButtonContainer}>
 <TouchableOpacity
    style={styles.fixedButton}
    onPress={() => {increaseProgress();
      if(serieMostrar<ejercicios?.[currentIndex].series){
  setSerieMostrar(serieMostrar+1)
}
    }}
    activeOpacity={0.9}
>
    <LinearGradient
        colors={
          seriecompleta
          ? ['#4CAF50', '#2E7D32'] 
          : ['#FFD369', '#FF9A00'] 
        } // Amarillo → Naranja
        style={styles.gradient}
    >
        <Text style={styles.createButtonText}>
            ✓ {seriecompleta? "Series Completas":`Completar Serie ${serieMostrar}`}
        </Text>
    </LinearGradient>
</TouchableOpacity>



  <TouchableOpacity
      style={styles.nextButton}
      onPress={() =>{
 if(seriecompleta){
if(currentIndex < ejercicios.length -1 ){
  console.log("esoy aqui")
  setCurrentIndex(currentIndex+1);
  setSerieActual(0)
  setProgress(0);
  setSerieMostrar(1);
  increaseGeneralProgress()
  
} else{
  alert("¡Has terminado la rutina!")
  
  router.push({
    pathname:"/screens/training-complete",
    params:{
      TiempoTrans:totalTime,
      idRoutine:id
    }
  })
  
}
 }else{
alert("completa las Series")
 }




      }}
      activeOpacity={0.9}
  >
      <Text style={styles.nextButtonText}>Siguiente</Text>
      <Ionicons
          name="arrow-forward"
          size={22}
          color="#FFD700"
      />
  </TouchableOpacity>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // fondo negro
    padding: 20
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },
  loadingText: {
    fontSize: 38,
    fontWeight: "500",
    color: "#FFD700" // amarillo
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  backButton: {
    marginRight: 10,
  },
  backArrow: {
    marginTop:20,
    fontSize: 24,
    marginRight:10,
    color: "#FFD700" // amarillo
  },
  backArrow2: {
    marginTop:20,
    fontSize: 24,
    marginRight:10,
    fontWeight:"bold",
    color: "#fff", 
      flexWrap: "wrap",
        maxWidth: "80%",   // hace que baje si no cabe


  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700" // amarillo
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#1a1a1a", // gris oscuro para contraste
    borderRadius: 10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#FFD700" // amarillo
  },
  sectionText: {
    color: "#fff" // texto blanco dentro de sección
  },
  progressContainer: {
    marginTop: 20,
    width: "100%", // la barra toma todo el ancho
  },
    progressLabelsRow: {
    flexDirection: "row",       // pone los textos en fila
    justifyContent:"space-between",// alineados a la izquierda
    alignItems: "center",        // centra verticalmente los textos
    marginBottom: 8,             // separa del progress bar
  },
progressLabel: {
  fontSize: 14,        // más pequeño
  fontWeight: "500",   // un poco menos pesado
  color: "#fff",       // blanco
  marginBottom: 2,     
  alignSelf: "flex-start" // alineado a la izquierda dentro del contenedor
},


   progressBarBackground: {
    width: "100%",
    height: 25,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    overflow: "hidden"
  },
    progressBarFill: {
    height: "100%",
    backgroundColor: "#FFD700",
    borderRadius: 12
  },
timerCard: {
  marginTop: 30,
  backgroundColor: "#3a3a3a", // gris oscuro
  borderRadius: 15,
  borderColor:"#FFD700",
  borderWidth:1,
  padding: 20,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
},
timerCard2: {
  marginTop: 30,
  backgroundColor: "#3a3a3a", // gris oscuro
  borderRadius: 15,
  borderColor:"#FFD700",
  borderWidth:1,
  padding: 20,
  height:200,

  justifyContent: "space-between",
  alignItems: "center"
},
timerSection: {
  alignItems: "center",
  flex: 1
},
timerIcon: {
  fontSize: 20,
  marginBottom: 10,
  color: "#FFD700" // amarillo
},
timerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFD700"
},
timerIcon2: {
  fontSize: 14,
  marginBottom: 10,
  color: "#fff" // amarillo
},
serieTitle: {
  fontSize: 28,
  fontWeight: "bold",
  color: "#FFD700", // amarillo
  marginBottom: 8
},
exerciseName: {
  fontSize: 20,
  fontWeight: "500",
  color: "#fff",
  marginBottom: 5
},
repsText: {
  fontSize: 16,
  color: "#ccc" // gris claro para detalle
},
   gradient: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
  },
    fixedButton: {
width:350,
  height: 60,
  borderRadius: 30,
  overflow: "hidden",
  margin:10,

  shadowColor: "#FF9A00",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.35,
  shadowRadius: 8,
  elevation: 8,
},
  createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    fixedButtonContainer: {
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,

  justifyContent: "space-between",
  alignItems: "center"
},
nextButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 20,
width:350,
  height: 60,
  borderRadius: 30,
  borderWidth: 2,
  borderColor: "#FFD700",
  backgroundColor: "#000",
  gap: 10,
  margin:10,
  marginBottom:30
},
nextButtonText: {
  color: "#FFD700",
  fontSize: 16,
  fontWeight: "600"
}

});
