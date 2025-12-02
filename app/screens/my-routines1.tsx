import { View, Text, Animated, ScrollView, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MyRoutines() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [selectedRoutineId, setSelectedRoutineId] = useState<number | null>(null)

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  // Datos de rutinas con ejercicios completos
    type Rutina = {
      id: number
      nombre: string
      descripcion: string
      duracion: string
      dificultad: string
      icono: React.ComponentProps<typeof Ionicons>['name']
      ultimaVez: string
      vecesCompletada: number
      ejercicios: Array<{
        id: string
        name: string
        target: string
        sets: string
        rest: string
        difficulty: string
        icon: React.ComponentProps<typeof Ionicons>['name']
      }>
    }
  
    const rutinasGuardadas: Rutina[] = [
      {
        id: 1,
        nombre: "Pierna",
        descripcion: "Ejercicios fundamentales para comenzar",
        duracion: "30-40 min",
        dificultad: "Fácil",
        icono: "man", // Ícono de persona/pierna completa
        ultimaVez: "Hace 2 días",
        vecesCompletada: 5,
        ejercicios: [
          {
            id: '1',
            name: 'Sentadillas',
            target: 'Piernas, glúteos',
            sets: '3 series x 12-15 reps',
            rest: '60 seg',
            difficulty: 'Medio',
            icon: 'fitness',
          },
          {
            id: '2',
            name: 'Zancadas',
            target: 'Piernas, glúteos',
            sets: '3 series x 10-12 reps',
            rest: '60 seg',
            difficulty: 'Medio',
            icon: 'walk',
          },
          {
            id: '3',
            name: 'Peso muerto',
            target: 'Isquiotibiales, glúteos',
            sets: '3 series x 10-12 reps',
            rest: '90 seg',
            difficulty: 'Medio',
            icon: 'barbell',
          },
          {
            id: '4',
            name: 'Extensiones de pierna',
            target: 'Cuádriceps',
            sets: '3 series x 12-15 reps',
            rest: '45 seg',
            difficulty: 'Fácil',
            icon: 'body',
          },
        ]
      },
      {
        id: 2,
        nombre: "Brazo",
        descripcion: "Fortalecimiento básico superior",
        duracion: "25-35 min",
        dificultad: "Fácil",
        icono: "barbell", // Ícono de pesa/fuerza para brazos
        ultimaVez: "Hace 5 días",
        vecesCompletada: 3,
        ejercicios: [
          {
            id: '1',
            name: 'Curl de bíceps',
            target: 'Bíceps',
            sets: '3 series x 12-15 reps',
            rest: '45 seg',
            difficulty: 'Fácil',
            icon: 'barbell',
          },
          {
            id: '2',
            name: 'Extensiones de tríceps',
            target: 'Tríceps',
            sets: '3 series x 12-15 reps',
            rest: '45 seg',
            difficulty: 'Fácil',
            icon: 'fitness',
          },
          {
            id: '3',
            name: 'Curl martillo',
            target: 'Bíceps, antebrazos',
            sets: '3 series x 10-12 reps',
            rest: '45 seg',
            difficulty: 'Fácil',
            icon: 'barbell',
          },
          {
            id: '4',
            name: 'Press francés',
            target: 'Tríceps',
            sets: '3 series x 10-12 reps',
            rest: '60 seg',
            difficulty: 'Medio',
            icon: 'body',
          },
          {
            id: '5',
            name: 'Curl concentrado',
            target: 'Bíceps',
            sets: '3 series x 10-12 reps',
            rest: '45 seg',
            difficulty: 'Fácil',
            icon: 'fitness',
          },
        ]
      },
      {
        id: 3,
        nombre: "Pantorrilla",
        descripcion: "Core y activación cardiovascular",
        duracion: "20-30 min",
        dificultad: "Fácil",
        icono: "footsteps", // Ícono de pasos/pies para pantorrillas
        ultimaVez: "Hace 1 semana",
        vecesCompletada: 7,
        ejercicios: [
          {
            id: '1',
            name: 'Elevación de talones de pie',
            target: 'Gemelos',
            sets: '4 series x 15-20 reps',
            rest: '30 seg',
            difficulty: 'Fácil',
            icon: 'walk',
          },
          {
            id: '2',
            name: 'Elevación de talones sentado',
            target: 'Sóleo',
            sets: '3 series x 15-20 reps',
            rest: '30 seg',
            difficulty: 'Fácil',
            icon: 'body',
          },
          {
            id: '3',
            name: 'Saltos de pantorrilla',
            target: 'Gemelos, cardio',
            sets: '3 series x 20 reps',
            rest: '45 seg',
            difficulty: 'Medio',
            icon: 'fitness',
          },
          {
            id: '4',
            name: 'Caminata en puntas',
            target: 'Gemelos, equilibrio',
            sets: '3 series x 30 seg',
            rest: '30 seg',
            difficulty: 'Fácil',
            icon: 'walk',
          },
        ]
      },
    ]

  const getSelectedRoutine = useCallback(() => {
    if (!selectedRoutineId) return null
    return rutinasGuardadas.find(r => r.id === selectedRoutineId) || null
  }, [selectedRoutineId])

  const handleStartRoutine = useCallback(() => {
    const selectedRoutine = getSelectedRoutine()
    
    if (!selectedRoutine) {
      ToastAndroid.show("Selecciona una rutina primero", ToastAndroid.SHORT)
      return
    }

    if (!selectedRoutine.ejercicios || selectedRoutine.ejercicios.length === 0) {
      ToastAndroid.show("Esta rutina no tiene ejercicios configurados", ToastAndroid.SHORT)
      return
    }

    // Navegar a routine-execution con los ejercicios
    router.push({
      pathname: "/screens/routine-execution",
      params: {
        routineName: selectedRoutine.nombre,
        level: selectedRoutine.dificultad,
        exercises: JSON.stringify(selectedRoutine.ejercicios)
      }
    })
  }, [selectedRoutineId, router, getSelectedRoutine])

  const handleRoutineSelect = useCallback((id: number) => {
    return setSelectedRoutineId(id)
  }, [])

  const handleCreateRoutine = useCallback(() => {
    router.replace("/screens/create-rutine")
  }, [router])

  const handleBack = useCallback(() => {
    router.replace("/screens/home-screen")
  }, [router])

  return (
    <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={0.8}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#FFC107" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Mis Rutinas</Text>
          </View>

          {/* Botón Generar Nueva Rutina */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateRoutine}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#2E8B57', '#3CB371']}
              style={styles.gradient}
            >
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text style={styles.createButtonText}>
                Generar Rutina Personalizada
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Título Rutinas Guardadas */}
          <Text style={styles.sectionTitle}>Rutinas Guardadas</Text>

          {/* Lista de Rutinas */}
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.routinesList}>
              {rutinasGuardadas.length > 0 ? (
                rutinasGuardadas.map((rutina) => (
                  <RoutineCard
                    key={rutina.id}
                    rutina={rutina}
                    isSelected={selectedRoutineId === rutina.id}
                    onSelect={handleRoutineSelect}
                  />
                ))
              ) : (
                <EmptyState />
              )}
            </View>
          </ScrollView>

          {/* Botón fijo para empezar rutina */}
          <TouchableOpacity
            style={styles.fixedButton}
            onPress={() => router.replace("/screens/routine-execution")}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FF9A00', '#FFB74D']}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Empezar Rutina</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  )
}

type RoutineCardProps = {
  rutina: {
    id: number
    nombre: string
    descripcion: string
    duracion: string
    dificultad: string
    icono: React.ComponentProps<typeof Ionicons>['name']
    ultimaVez: string
    vecesCompletada: number
    ejercicios: any[]
  }
  isSelected: boolean
  onSelect: (id: number) => void
}

const RoutineCard = React.memo(({ rutina, isSelected, onSelect }: RoutineCardProps) => (
  <TouchableOpacity
    onPress={() => onSelect(rutina.id)}
    activeOpacity={0.8}
    style={[
      styles.routineCard,
      isSelected && styles.routineCardSelected
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
          <Text style={styles.routineDuration}>
            {rutina.duracion} • {rutina.ejercicios.length} ejercicios
          </Text>
          <View style={styles.routineStats}>
            <Text style={styles.routineStatText}>✓ {rutina.vecesCompletada} veces</Text>
            <Text style={styles.routineStatText}>{rutina.ultimaVez}</Text>
          </View>
        </View>
      </View>
    </View>

    {isSelected && (
      <View style={styles.selectedIndicator}>
        <Ionicons name="checkmark-circle" size={24} color="#FFC107" />
      </View>
    )}
  </TouchableOpacity>
))

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="fitness-outline" size={80} color="#444" />
    <Text style={styles.emptyText}>Aún no tienes rutinas guardadas</Text>
    <Text style={styles.emptySubtext}>
      Crea tu primera rutina personalizada para comenzar
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
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
  createButton: {
    marginHorizontal: 16,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#2E8B57',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
    borderColor: '#1F1F1F',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    position: 'relative',
  },
  routineCardSelected: {
    borderColor: '#FFC107',
    backgroundColor: '#2A2A2A',
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
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#FF9A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#AAA',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
})