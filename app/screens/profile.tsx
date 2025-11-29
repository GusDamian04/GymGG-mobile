import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getAllMemberships } from "@/app/services/membership";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
const [membershipName, setMembershipName] = useState<string>("Cargando...");

      const router = useRouter()

      
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("userData");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    };

    loadUser();
  }, []);
    
useEffect(() => {
  const loadUser = async () => {
    const stored = await AsyncStorage.getItem("userData");
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser);

      // ⬅️ Aquí llamas a membership
      if (parsedUser.membership) {
        const memberships = await getAllMemberships();
    

  const match = memberships.find(
          (m: any) => m.id === parsedUser.membership
        )
        if (match) {

          setMembershipName(match.name_membership);
        } else {
          setMembershipName("Membresía no encontrada");
        }

  } else {
        setMembershipName("Sin membresía");
      }

    }


  };

  loadUser();
}, []);

  
return (
  <LinearGradient colors={["#0A0A0A", "#1A1A1A"]} style={styles.container}>
    <View style={styles.content}>

      {/* Header con flecha junto al título */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => router.replace("/screens/home-screen")}
          
          activeOpacity={0.8}
          style={styles.backButtonSmall}
        >
          <Ionicons name="arrow-back" size={20} color="#FFD369" />
        </TouchableOpacity>
        <Text style={styles.title}>Mi Perfil</Text>
      </View>

      {/* Tarjeta del Perfil */}
      <View style={styles.card}>
        <Text style={styles.label}>Nombre de usuario</Text>
        <Text style={styles.value}>
          {user?.name||"cargando"}
          </Text>

        <View style={styles.separator} />

        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.value}>
          {user?.email || "---"}
          </Text>

        <View style={styles.separator} />

        <Text style={styles.label}>Tipo de membresía</Text>
        <Text style={styles.valueHighlight}>{membershipName|| "Sin membresia"}</Text>

        <View style={styles.separator} />

        <Text style={styles.label}>Vigencia restante</Text>
        <Text style={styles.value}>27 días restantes</Text>
      </View>

      {/* Botón de cambiar contraseña con gradiente más notorio */}
      <LinearGradient
        colors={["#FFD369", "#FF9A00"]}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.buttonGradient}
      >
        <TouchableOpacity style={styles.buttonSmall} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </LinearGradient>

    </View>
  </LinearGradient>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingTop: 80,
    paddingHorizontal: 25,
  },

  /* Header con flecha */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  backButtonSmall: {
    marginRight: 12,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
  },

  /* Tarjeta estilo glass */
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 22,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    marginBottom: 28,

    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    marginBottom: 4,
  },

  value: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  valueHighlight: {
    color: "#FFD369",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 10,
  },

  /* Gradient wrapper del botón: más grande para que el gradiente se note */
  buttonGradient: {
    alignSelf: "center",
    
    borderRadius: 16,
    padding: 2, // borde del gradiente visible
  // más ancho para que se note
    shadowColor: "#FFD369",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },

  /* Botón interior (fondo oscuro para contraste con el gradiente) */
  buttonSmall: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 12,
    paddingHorizontal:70,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
})
