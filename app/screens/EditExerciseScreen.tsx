import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// @ts-ignore: missing type declarations for react-native-vector-icons
import Icon from "react-native-vector-icons/MaterialIcons";

type EditExerciseScreenProps = NativeStackScreenProps<any, "EditExercise">;

export default function EditExerciseScreen({ route, navigation }: EditExerciseScreenProps) {
  const { exercise, isNewExercise = false } = route.params ?? {};

  const [form, setForm] = useState({
    name: exercise?.name || "",
    target: exercise?.target || "",
    sets: exercise?.sets || "",
    rest: exercise?.rest || "",
    difficulty: exercise?.difficulty || "Medio",
    iconName: exercise?.iconName || "fitness_center",
  });

  const [hasChanges, setHasChanges] = useState(false);

  const availableIcons: Record<string, string> = {
    fitness_center: "fitness-center",
    directions_run: "directions-run",
    accessibility_new: "accessibility-new",
    straighten: "straighten",
    sports_gymnastics: "sports-gymnastics",
    sports_martial_arts: "sports-martial-arts",
    pool: "pool",
    sports_handball: "sports-handball",
    sports_kabaddi: "sports-kabaddi",
    self_improvement: "self-improvement",
  };

  const difficulties = ["Fácil", "Medio", "Difícil"]; 

  const updateField = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
    setHasChanges(true);
  };

  const saveExercise = () => {
    if (!form.name.trim()) return alert("El nombre es obligatorio");
    if (!form.target.trim()) return alert("El grupo muscular es obligatorio");
    if (!form.sets.trim()) return alert("Las series son obligatorias");
    if (!form.rest.trim()) return alert("El descanso es obligatorio");

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>
          {isNewExercise ? "Nuevo Ejercicio" : "Editar Ejercicio"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Nombre */}
        <View style={styles.section}>
          <Text style={styles.label}>Nombre del ejercicio</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(v) => updateField("name", v)}
          />
        </View>

        {/* Target */}
        <View style={styles.section}>
          <Text style={styles.label}>Grupo muscular</Text>
          <TextInput
            style={styles.input}
            value={form.target}
            onChangeText={(v) => updateField("target", v)}
          />
        </View>

        {/* Parámetros */}
        <View style={styles.section}>
          <Text style={styles.label}>Series y repeticiones</Text>
          <TextInput
            style={styles.input}
            value={form.sets}
            onChangeText={(v) => updateField("sets", v)}
          />

          <Text style={styles.label}>Descanso</Text>
          <TextInput
            style={styles.input}
            value={form.rest}
            onChangeText={(v) => updateField("rest", v)}
          />
        </View>

        {/* Iconos */}
        <View style={styles.section}>
          <Text style={styles.label}>Icono</Text>
          <View style={styles.iconGrid}>
            {Object.keys(availableIcons).map((key) => {
              const isSelected = form.iconName === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.iconBox, isSelected && styles.iconSelected]}
                  onPress={() => updateField("iconName", key)}
                >
                  <Icon
                    name={availableIcons[key]}
                    size={26}
                    color={isSelected ? "#FFC107" : "#fff"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Dificultad */}
        <View style={styles.section}>
          <Text style={styles.label}>Dificultad</Text>
          <View style={styles.row}>
            {difficulties.map((d) => {
              const isSelected = form.difficulty === d;
              return (
                <TouchableOpacity
                  key={d}
                  style={[styles.diffBtn, isSelected && styles.diffSelected]}
                  onPress={() => updateField("difficulty", d)}
                >
                  <Text
                    style={{ color: isSelected ? "#000" : "#fff" }}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {hasChanges && (
        <TouchableOpacity style={styles.saveButton} onPress={saveExercise}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a1a" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  title: { color: "#fff", fontSize: 22, marginLeft: 10 },
  content: { padding: 20, paddingBottom: 120 },

  section: { marginBottom: 25 },
  label: { color: "#ccc", marginBottom: 6 },

  input: {
    backgroundColor: "#2a2a2a",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
  },

  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  iconBox: {
    width: 55,
    height: 55,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  iconSelected: {
    borderWidth: 2,
    borderColor: "#FFC107",
  },

  row: { flexDirection: "row", gap: 8 },

  diffBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    alignItems: "center",
  },

  diffSelected: {
    backgroundColor: "#FFC107",
  },

  saveButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#FFC107",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },

  saveText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
