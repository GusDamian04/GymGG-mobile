import { View,Dimensions  ,Text, Animated, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState  } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BarChart } from "react-native-chart-kit";
import Collapsible from "react-native-collapsible";
import { ActivityIndicator } from "react-native";

import { getHistorialRoutineDataPerMonth,getHistorialRoutineDataPerYeak } from '../services/routines'


// estas graficas contienen datos dummy pero que son claros para mostrar como funcionan los mimos
// dentro de su funcionalidad es importante que se generen autamiticamente

export default function MyRoutines() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [expanded, setExpanded] = useState<boolean>(false);
  const [expanded2, setExpanded2] = useState<boolean>(false);


  const [loading, setLoading] = useState(true);

const [expandedMes, setExpandedMes] = useState<string | null>(null);

const toggleMes = (mes: string) => {
  setExpandedMes(expandedMes === mes ? null : mes);
};


  const [historialDate, setHistorialData]= useState<any>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

useEffect(() => {
  const loadHistorialData = async () => {
    try {
      const data = await getHistorialRoutineDataPerMonth();

      const resultado: any[] = [];

      // recorrer meses
      Object.entries(data).forEach(([monthName, weeks]: any) => {
        
        // recorrer semanas dentro del mes
        Object.entries(weeks).forEach(([weekName, items]: any) => {

          // recorrer las rutinas dentro de la semana
          items.forEach((item: any) => {
            resultado.push({
              mes: monthName,
              semana: weekName,
              idRoutina: item.routine,
              fecha: item.Date_realization,
              tiempoHecho: item.Time_to_done,
            });
          });

        });
      });

      setHistorialData(data);
      console.log("Historial mapeado:", data);

    } catch (error) {
      console.log("Error cargando historial:", error);
    } finally{
    setLoading(false);

    }
  };

  loadHistorialData();
}, []);



const totales: Record<string, Record<string, number>> = {};
if(historialDate){

  
  Object.entries(historialDate).forEach(([mes, semanas]: any) => {
    totales[mes] = {};  // Crear entrada del mes
    
    Object.entries(semanas).forEach(([semana, items]: any) => {
      totales[mes][semana] = items.reduce(
        (acc: number, rutina: any) => acc + rutina.Time_to_done,
        0
      );
    });
  });
}

const mesesConDatos = Object.entries(totales).filter(([mes, semanas]) =>
  Object.values(semanas).some((valor: number) => valor > 0)
);


const convertirDatosGrafica = (semanas: any) => {
  const labels = ["1ra", "2da", "3ra", "4ta", "5ta"];

  const datos = [
    semanas.week_1,
    semanas.week_2,
    semanas.week_3,
    semanas.week_4,
    semanas.week_5,
  ];

  return { labels, datos };
};


const mesesES: Record<string, string> = {
  January: "Enero",
  February: "Febrero",
  March: "Marzo",
  April: "Abril",
  May: "Mayo",
  June: "Junio",
  July: "Julio",
  August: "Agosto",
  September: "Septiembre",
  October: "Octubre",
  November: "Noviembre",
  December: "Diciembre",
};


  return (
  <LinearGradient colors={["#0A0A0A", "#1A1A1A"]} style={styles.container}>
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
              <Ionicons name="arrow-back" size={26} color="#FFD369" />
            </TouchableOpacity>

            <Text style={styles.greeting}>Historial de progreso</Text>
          </View>

        {loading && (
            <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#FFD369" />
    <Text style={{ color: "#FFF", marginTop: 10 }}>Cargando datos...</Text>
  </View>
        )}

{!loading && mesesConDatos.length === 0 && (
  <View style={{ padding: 20 }}>
    <Text style={{ color: "#FFF", textAlign: "center", fontSize: 16 }}>
      No se encontraron datos en tu historial.
    </Text>
  </View>
)}
{!loading && mesesConDatos.length>0 && (


<>
      {mesesConDatos.map(([mes,semanas]:any)=> {
        const {labels, datos}=convertirDatosGrafica(semanas)
        return (
          
          <View  key= {mes}style={styles.card}>
            <TouchableOpacity
              style={styles.accordionButton}
              onPress={() => {toggleMes(mes); }}
              >
              <Text style={styles.accordionText}>
                {expandedMes === mes ? `Ocultar gráfico de ${mesesES[mes]}` : `Ver gráfico mensual de ${mesesES[mes]}`}
              </Text>
            </TouchableOpacity>

            <Collapsible collapsed={expandedMes!==mes}>
              <View style={styles.chartContainer}>
                <BarChart
                  data={{
                    labels: labels,
                    datasets: [{ data: datos }],
                  }}
                  width={Dimensions.get("window").width - 60}
                  height={240}
                  fromZero
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={{
                    backgroundColor: "transparent",
                    backgroundGradientFrom: "transparent",
                    backgroundGradientTo: "transparent",
                    decimalPlaces: 0,
                    color: () => "#FFFFFF",
                    fillShadowGradient: "#6EE7B7",
                    fillShadowGradientOpacity: 1,
                    propsForBackgroundLines: {
                      strokeDasharray: "",
                      stroke: "rgba(255,255,255,0.1)",
                    },
                    propsForLabels: {
                      fill: "#FFF",
                    },
                  }}
                  style={styles.chart}
                  />
              </View>
            </Collapsible>
          </View>
        )
      })}
      </>


)}

        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  </LinearGradient>
)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  backButton: {
    marginRight: 12,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
  },

  greeting: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },

  /* Tarjeta estilo moderno */
  card: {
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  accordionButton: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  accordionText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },

  chartContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  chart: {
    borderRadius: 16,
  },
loadingContainer: {
  marginTop: 40,
  justifyContent: "center",
  alignItems: "center",
}

})
