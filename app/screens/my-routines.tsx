import { View, Text, Animated, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MyRoutines() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
          <ScrollView contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.8}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="#FFC107" />
              </TouchableOpacity>
            </View>

            {/* Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="barbell" size={60} color="#FFC107" />
              </View>
            </View>

            <Text style={styles.title}>Aquí se mostrarán mis rutinas como Usuario</Text>
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
    flexGrow: 1,
  },
  header: {
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
})