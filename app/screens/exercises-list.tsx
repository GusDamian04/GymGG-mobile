import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Iconos
const ArrowLeft = ({ size = 24 }) => (
  <Ionicons name="arrow-back" size={size} color="#FFC107" />
);

const Play = ({ color = 'black', size = 24 }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color, fontSize: size * 0.6, fontWeight: 'bold' }}>▶</Text>
  </View>
);

const ChevronRight = ({ color = 'black', size = 24 }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color, fontSize: size * 0.8, fontWeight: 'bold' }}>›</Text>
  </View>
);

interface Exercise {
  id: number;
  name: string;
  illustration: string;
  duration: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface ExerciseCategory {
  title: string;
  headerImage: string;
  list: Exercise[];
}

const ExerciseList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleBackToHome = () => {
    router.replace('/screens/home-screen');
  };

  const categories: Category[] = [
    {
      id: 'back',
      name: 'back',
      image: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=400&h=500&fit=crop',
    },
    {
      id: 'cardio',
      name: 'cardio',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=500&fit=crop',
    },
    {
      id: 'chest',
      name: 'chest',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop',
    },
    {
      id: 'legs',
      name: 'legs',
      image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=500&fit=crop',
    },
    {
      id: 'abs',
      name: 'abs',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop',
    },
    {
      id: 'arms',
      name: 'arms',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=500&fit=crop',
    },
  ];

  const exercises: Record<string, ExerciseCategory> = {
    back: {
      title: 'back exercises',
      headerImage: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&h=400&fit=crop',
      list: [
        {
          id: 1,
          name: 'pull up',
          illustration: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
          duration: '0:16',
        },
        {
          id: 2,
          name: 'chin up',
          illustration: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&h=300&fit=crop',
          duration: '0:14',
        },
        {
          id: 3,
          name: 'bent over row',
          illustration: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&h=300&fit=crop',
          duration: '0:18',
        },
        {
          id: 4,
          name: 'lat pulldown',
          illustration: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=300&h=300&fit=crop',
          duration: '0:15',
        },
      ],
    },
    cardio: {
      title: 'cardio exercises',
      headerImage: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&h=400&fit=crop',
      list: [
        {
          id: 5,
          name: 'jumping jacks',
          illustration: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=300&h=300&fit=crop',
          duration: '0:20',
        },
        {
          id: 6,
          name: 'burpees',
          illustration: 'https://images.unsplash.com/photo-1598266663439-2056e6900339?w=300&h=300&fit=crop',
          duration: '0:25',
        },
        {
          id: 7,
          name: 'mountain climbers',
          illustration: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&h=300&fit=crop',
          duration: '0:18',
        },
        {
          id: 8,
          name: 'high knees',
          illustration: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
          duration: '0:16',
        },
      ],
    },
    chest: {
      title: 'chest exercises',
      headerImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop',
      list: [
        {
          id: 9,
          name: 'bench press',
          illustration: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=300&h=300&fit=crop',
          duration: '0:20',
        },
        {
          id: 10,
          name: 'push ups',
          illustration: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=300&h=300&fit=crop',
          duration: '0:15',
        },
        {
          id: 11,
          name: 'dumbbell flyes',
          illustration: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
          duration: '0:17',
        },
        {
          id: 12,
          name: 'chest dips',
          illustration: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
          duration: '0:14',
        },
      ],
    },
    arms: {
      title: 'arms exercises',
      headerImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=400&fit=crop',
      list: [
        {
          id: 13,
          name: 'bicep curls',
          illustration: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop',
          duration: '0:15',
        },
        {
          id: 14,
          name: 'tricep dips',
          illustration: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=300&h=300&fit=crop',
          duration: '0:16',
        },
        {
          id: 15,
          name: 'hammer curls',
          illustration: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=300&fit=crop',
          duration: '0:14',
        },
        {
          id: 16,
          name: 'overhead extension',
          illustration: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&h=300&fit=crop',
          duration: '0:18',
        },
      ],
    },
    legs: {
      title: 'legs exercises',
      headerImage: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=400&fit=crop',
      list: [
        {
          id: 17,
          name: 'squats',
          illustration: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=300&fit=crop',
          duration: '0:20',
        },
        {
          id: 18,
          name: 'lunges',
          illustration: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
          duration: '0:18',
        },
        {
          id: 19,
          name: 'leg press',
          illustration: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop',
          duration: '0:22',
        },
        {
          id: 20,
          name: 'calf raises',
          illustration: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&h=300&fit=crop',
          duration: '0:12',
        },
      ],
    },
    abs: {
      title: 'abs exercises',
      headerImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      list: [
        {
          id: 21,
          name: 'crunches',
          illustration: 'https://images.unsplash.com/photo-1598266663439-2056e6900339?w=300&h=300&fit=crop',
          duration: '0:15',
        },
        {
          id: 22,
          name: 'plank',
          illustration: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&h=300&fit=crop',
          duration: '0:30',
        },
        {
          id: 23,
          name: 'leg raises',
          illustration: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
          duration: '0:16',
        },
        {
          id: 24,
          name: 'bicycle crunches',
          illustration: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop',
          duration: '0:18',
        },
      ],
    },
  };

  // Vista de detalle de un ejercicio
  if (selectedExercise) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView>
          {/* Header with Image */}
          <View style={styles.exerciseHeader}>
            <Image
              source={{ uri: selectedExercise.illustration }}
              style={styles.exerciseHeaderImage}
            />
            <View style={styles.exerciseHeaderOverlay} />

            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedExercise(null)}
              activeOpacity={0.8}
            >
              <ArrowLeft size={20} />
            </TouchableOpacity>

            {/* Title */}
            <View style={styles.exerciseHeaderContent}>
              <Text style={styles.exerciseTitle}>{selectedExercise.name}</Text>
              <Text style={styles.exerciseSubtitle}>
                Duración: {selectedExercise.duration}
              </Text>
            </View>
          </View>

          {/* Exercise Details */}
          <View style={styles.exerciseDetails}>
            <Text style={styles.detailsTitle}>Descripción del ejercicio</Text>
            <Text style={styles.detailsText}>
              Este es un ejercicio efectivo para tu entrenamiento. Asegúrate de
              mantener una buena forma y respirar correctamente durante la
              ejecución.
            </Text>

            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>Consejos</Text>
              <Text style={styles.tipText}>• Calienta antes de comenzar</Text>
              <Text style={styles.tipText}>• Mantén una postura correcta</Text>
              <Text style={styles.tipText}>• Respira de manera controlada</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Vista de lista de ejercicios de una categoría
  if (selectedCategory) {
    const categoryData = exercises[selectedCategory];

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView>
          {/* Header with Image */}
          <View style={styles.categoryHeader}>
            <Image
              source={{ uri: categoryData.headerImage }}
              style={styles.categoryHeaderImage}
            />
            <View style={styles.categoryHeaderOverlay} />

            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedCategory(null)}
              activeOpacity={0.8}
            >
              <ArrowLeft size={20} />
            </TouchableOpacity>

            {/* Title */}
            <View style={styles.categoryHeaderContent}>
              <Text style={styles.categoryTitle}>{categoryData.title}</Text>
              <Text style={styles.categorySubtitle}>
                {categoryData.list.length} ejercicios
              </Text>
            </View>
          </View>

          {/* Exercise List */}
          <View style={styles.exerciseList}>
            {categoryData.list.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                style={styles.exerciseCard}
                onPress={() => setSelectedExercise(exercise)}
                activeOpacity={0.8}
              >
                <View style={styles.exerciseImageContainer}>
                  <Image
                    source={{ uri: exercise.illustration }}
                    style={styles.exerciseImage}
                  />
                  <View style={styles.exerciseImageOverlay} />
                  <View style={styles.playButtonContainer}>
                    <View style={styles.playButton}>
                      <Play size={12} />
                    </View>
                  </View>
                </View>

                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{exercise.duration}</Text>
                  </View>
                </View>

                <ChevronRight color="#000" size={20} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Vista principal de categorías
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        {/* Header */}
        <View style={styles.mainHeader}>
          <TouchableOpacity
            style={styles.mainBackButton}
            onPress={handleBackToHome}
          >
            <ArrowLeft size={20} />
          </TouchableOpacity>

          <View style={styles.mainHeaderContent}>
            <Text style={styles.mainTitle}>Exercises</Text>
            <Text style={styles.mainSubtitle}>
              Selecciona una categoría para comenzar
            </Text>
          </View>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => setSelectedCategory(category.id)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />
              <View style={styles.categoryOverlay} />
              <View style={styles.categoryNameContainer}>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  // Main screen styles
  mainHeader: {
    padding: 20,
    paddingTop: 32,
    position: 'relative',
  },
  mainBackButton: {
    position: 'absolute',
    top: 32,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 10,
  },
  mainHeaderContent: {
    paddingLeft: 52,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    paddingBottom: 96,
  },
  categoryCard: {
    width: '48%',
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    margin: '1%',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  categoryNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'lowercase',
  },
  // Category list styles
  categoryHeader: {
    height: 192,
    position: 'relative',
  },
  categoryHeaderImage: {
    width: '100%',
    height: '100%',
  },
  categoryHeaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  categoryHeaderContent: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'lowercase',
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  exerciseList: {
    padding: 20,
    paddingBottom: 96,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFC107',
    padding: 12,
    marginBottom: 16,
  },
  exerciseImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  exerciseImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(234, 179, 8, 0.9)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 16,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'lowercase',
    marginBottom: 4,
  },
  durationBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  durationText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  // Exercise detail styles
  exerciseHeader: {
    height: 300,
    position: 'relative',
  },
  exerciseHeaderImage: {
    width: '100%',
    height: '100%',
  },
  exerciseHeaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  exerciseHeaderContent: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
  },
  exerciseTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'lowercase',
  },
  exerciseSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
  },
  exerciseDetails: {
    padding: 20,
    paddingBottom: 96,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  detailsText: {
    fontSize: 16,
    color: '#9ca3af',
    lineHeight: 24,
    marginBottom: 24,
  },
  tipsContainer: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderWidth: 1,
    borderColor: '#FFC107',
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFC107',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
});

export default ExerciseList;