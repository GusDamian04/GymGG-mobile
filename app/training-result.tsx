import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AppTheme = {
  backgroundColor: '#1a1a1a',
  cardColor: '#2a2a2a',
  accentColor: '#00ff88',
};

export default function TrainingResultScreen() {
  const params = useLocalSearchParams();
  const { gender, age, condition, goal, experience, duration, availableTime } = params;

  const resultData = [
    { label: 'Género', value: gender, icon: 'person' as const },
    { label: 'Edad', value: `${age} años`, icon: 'calendar' as const },
    { label: 'Padecimiento', value: condition, icon: 'medical' as const },
    { label: 'Objetivo', value: goal, icon: 'flag' as const },
    { label: 'Experiencia', value: experience, icon: 'barbell' as const },
    { label: 'Plazo', value: duration, icon: 'calendar' as const },
    { label: 'Tiempo disponible', value: availableTime, icon: 'time' as const },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.resultHeaderTitle}>Tu Perfil de Entrenamiento</Text>
      </View>

      <ScrollView style={styles.resultContent}>
        {resultData.map((item, index) => (
          <View key={index} style={styles.resultCard}>
            <View style={styles.resultIconContainer}>
              <Ionicons name={item.icon} size={24} color={AppTheme.accentColor} />
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultLabel}>{item.label}</Text>
              <Text style={styles.resultValue}>{item.value}</Text>
            </View>
          </View>
        ))}

        <View style={styles.completedCard}>
          <Ionicons name="star" size={40} color={AppTheme.accentColor} />
          <Text style={styles.completedTitle}>¡Perfil completado!</Text>
          <Text style={styles.completedSubtitle}>
            Tu rutina será personalizada según tu experiencia y tiempo disponible.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.backgroundColor,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  resultHeaderTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  resultContent: {
    flex: 1,
    padding: 20,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: AppTheme.cardColor,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  resultIconContainer: {
    padding: 10,
    backgroundColor: `${AppTheme.accentColor}33`,
    borderRadius: 8,
  },
  resultTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  resultLabel: {
    color: '#666',
    fontSize: 12,
  },
  resultValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  completedCard: {
    backgroundColor: `${AppTheme.accentColor}1A`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppTheme.accentColor,
    padding: 20,
    alignItems: 'center',
    marginTop: 30,
  },
  completedTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  completedSubtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});