import { View,Dimensions  ,Text, Animated, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState  } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BarChart } from "react-native-chart-kit";
import Collapsible from "react-native-collapsible";


// estas graficas contienen datos dummy pero que son claros para mostrar como funcionan los mimos
// dentro de su funcionalidad es importante que se generen autamiticamente

export default function MyRoutines() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [expanded, setExpanded] = useState<boolean>(false);
  const [expanded2, setExpanded2] = useState<boolean>(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

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

          {/* Tarjeta del acordeón */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.accordionButton}
              onPress={() => setExpanded(!expanded)}
            >
              <Text style={styles.accordionText}>
                {expanded ? "Ocultar gráfico" : "Ver gráfico mensual"}
              </Text>
            </TouchableOpacity>

            <Collapsible collapsed={!expanded}>
              <View style={styles.chartContainer}>
                <BarChart
                  data={{
                    labels: ["1ra", "2da", "3ra", "4ta"],
                    datasets: [{ data: [20, 50, 28, 67] }],
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

          {/* Segunda tarjeta */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.accordionButton}
              onPress={() => setExpanded2(!expanded2)}
            >
              <Text style={styles.accordionText}>
                Resultados de enero
              </Text>
            </TouchableOpacity>

            <Collapsible collapsed={!expanded2}>
              <View style={styles.chartContainer}>
                <BarChart
                  data={{
                    labels: ["1ra", "2da", "3ra", "4ta"],
                    datasets: [{ data: [20, 50, 28, 67] }],
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
                    fillShadowGradient: "#FFD369",
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
})
