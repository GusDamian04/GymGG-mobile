import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrainingResultScreen() {
  const params = useLocalSearchParams();
  const { gender, age, condition, goal, experience, duration, availableTime } =
    params;

  const resultData = [
    { label: "Género", value: gender, icon: "person" },
    { label: "Edad", value: `${age} años`, icon: "calendar" },
    { label: "Padecimiento", value: condition, icon: "medkit" },
    { label: "Objetivo", value: goal, icon: "flag" },
    { label: "Experiencia", value: experience, icon: "barbell" },
    { label: "Plazo", value: duration, icon: "calendar" },
    { label: "Tiempo disponible", value: availableTime, icon: "time" },
  ];

  return (
    <LinearGradient
      colors={["#0D0D0D", "#1C1C1C"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tu Perfil de Entrenamiento</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>

          {/* TARJETAS DE RESULTADOS */}
          {resultData.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.iconBox}>
                <Ionicons 
                  name={item.icon as React.ComponentProps<typeof Ionicons>["name"]} 
                  size={26} 
                  color="#FFC107" 
                />
              </View>

              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            </View>
          ))}

          {/* COMPLETED */}
          <View style={styles.completedBox}>
            <View style={styles.starCircle}>
              <Ionicons name="star" size={40} color="#FFC107" />
            </View>
            <Text style={styles.completedTitle}>¡Perfil Completado!</Text>
            <Text style={styles.completedSubtitle}>
              Tu rutina será personalizada según tu experiencia y tiempo disponible.
            </Text>
          </View>

          {/* BOTÓN DE ACCIÓN */}
          <TouchableOpacity 
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={() => router.replace("/screens/routine-selection")}
          >
            <LinearGradient
              colors={['#FFC107', '#FF9800']}
              style={styles.gradient}
            >
              <Text style={styles.actionButtonText} >Comenzar Entrenamiento</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,193,7,0.2)",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "rgba(255,193,7,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    color: "#AAA",
    fontSize: 13,
  },
  value: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 4,
  },

  completedBox: {
    marginTop: 25,
    padding: 30,
    borderRadius: 16,
    backgroundColor: "rgba(255,193,7,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,193,7,0.4)",
    alignItems: "center",
  },
  starCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,193,7,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  completedTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  completedSubtitle: {
    color: "#AAA",
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
  },

  actionButton: {
    width: "100%",
    height: 55,
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
  },
  gradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#0D0D0D",
    fontSize: 18,
    fontWeight: "600",
  },
});