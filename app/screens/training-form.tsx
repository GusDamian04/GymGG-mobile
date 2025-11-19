import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveProfile } from '../services/profile';

const { width } = Dimensions.get('window');

// 🚨 La pantalla debe tener el mismo nombre que el archivo para mayor claridad
export const TrainingLevelForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Para evitar doble clic

  const scrollViewRef = useRef<ScrollView>(null);

  const nextPage = () => {
    if (currentPage < 5) {
      const nextPageIndex = currentPage + 1;
      setCurrentPage(nextPageIndex);
      scrollViewRef.current?.scrollTo({
        x: width * nextPageIndex,
        animated: true,
      });
    } else {
      submitForm();
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      const prevPageIndex = currentPage - 1;
      setCurrentPage(prevPageIndex);
      scrollViewRef.current?.scrollTo({
        x: width * prevPageIndex,
        animated: true,
      });
    }
  };

  const canContinue = () => {
    switch (currentPage) {
      case 0:
        return gender !== null;
      case 1:
        return age !== null && age >= 12 && age <= 80;
      case 2:
        return condition !== null;
      case 3:
        return goal !== null;
      case 4:
        return experience !== null;
      case 5:
        return duration !== null;
      default:
        return false;
    }
  };

  const submitForm = async () => {
    if (isSubmitting) return; 

    // 1. Calcular el nivel basado en la experiencia (requerido por el backend)
    let selectedLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    if (experience === 'Intermedio') {
      selectedLevel = 'intermediate';
    } else if (experience === 'Avanzado') {
      selectedLevel = 'advanced';
    }

    // El objeto de datos debe coincidir con el tipo UserProfile (camelCase)
    const profileData = {
      gender,
      age,
      condition,
      goal,
      experience,
      duration,
      fitnessLevel: selectedLevel,
    };
    
    setIsSubmitting(true);

    try {
        // 2. Llama al servicio real de guardado
        await saveProfile(profileData as any);
        
        // 3. Notificación de éxito y navegación al Home
        Alert.alert("Éxito", "Tu perfil de fitness ha sido guardado.", [
            { text: "OK", onPress: () => {
                // Navegar al Home (reemplazamos la pantalla de historial)
                router.replace("/screens/home-screen"); 
            }}
        ]);
        
    } catch (err: any) {
        // 4. Manejo de errores de la API
        console.error("Error al guardar perfil:", err);
        Alert.alert("Error", err.message || "No pudimos guardar tu perfil. Intenta más tarde.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const renderGenderPage = () => {
    const options = [
      { icon: 'male', title: 'Masculino', value: 'Masculino' },
      { icon: 'female', title: 'Femenino', value: 'Femenino' },
      { icon: 'person', title: 'Otro', value: 'Otro' },
    ];
    return renderQuestionPage('¿Cuál es tu género?', options, gender, setGender);
  };

  const renderAgePage = () => (
    <View style={styles.pageContainer}>
      <Text style={styles.questionTitle}>¿Cuál es tu edad?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu edad"
          placeholderTextColor="#888"
          keyboardType="numeric"
          onChangeText={(value) => {
            const parsedAge = parseInt(value);
            if (!isNaN(parsedAge)) {
              setAge(parsedAge);
            } else {
              setAge(null); 
            }
          }}
          value={age !== null ? String(age) : ''}
          maxLength={2} // Limitar la entrada a dos dígitos
        />
      </View>
      <Text style={styles.helperText}>Edad válida: entre 12 y 80 años</Text>
    </View>
  );

  const renderConditionPage = () => {
    const options = [
      {
        icon: 'checkmark-circle-outline',
        title: 'Ninguno',
        subtitle: 'Sin restricciones',
        value: 'Ninguno',
      },
      {
        icon: 'bandage',
        title: 'Lesión leve',
        subtitle: 'Requiere cuidado',
        value: 'Lesión leve',
      },
      {
        icon: 'heart',
        title: 'Problemas cardíacos',
        subtitle: 'Consulta a tu médico',
        value: 'Problemas cardíacos',
      },
      {
        icon: 'warning',
        title: 'Otro',
        subtitle: 'Especificar más tarde',
        value: 'Otro',
      },
    ];
    return renderQuestionPage(
      '¿Tienes algún padecimiento?',
      options,
      condition,
      setCondition
    );
  };

  const renderGoalPage = () => {
    const options = [
      {
        icon: 'trending-down',
        title: 'Perder grasa',
        subtitle: 'Definición y pérdida de peso',
        value: 'Perder grasa',
      },
      {
        icon: 'barbell',
        title: 'Aumentar masa muscular',
        subtitle: 'Hipertrofia y fuerza',
        value: 'Aumentar masa muscular',
      },
      {
        icon: 'body',
        title: 'Mantenerme',
        subtitle: 'Conservar mi condición actual',
        value: 'Mantener condición',
      },
    ];
    return renderQuestionPage('¿Cuál es tu objetivo?', options, goal, setGoal);
  };

  const renderExperiencePage = () => {
    const options = [
      {
        icon: 'walk',
        title: 'Principiante',
        subtitle: 'Estoy comenzando o tengo poca experiencia',
        value: 'Principiante',
      },
      {
        icon: 'walk',
        title: 'Intermedio',
        subtitle: 'Entreno regularmente y conozco ejercicios básicos',
        value: 'Intermedio',
      },
      {
        icon: 'fitness',
        title: 'Avanzado',
        subtitle: 'Tengo mucha experiencia y entreno con intensidad',
        value: 'Avanzado',
      },
    ];
    return renderQuestionPage(
      '¿Cuál es tu nivel de experiencia?',
      options,
      experience,
      setExperience
    );
  };

  const renderDurationPage = () => {
    const options = [
      { icon: 'calendar', title: '1 mes', value: '1 mes' },
      { icon: 'calendar', title: '3 meses', value: '3 meses' },
      { icon: 'calendar', title: '6 meses', value: '6 meses' },
      { icon: 'calendar', title: '1 año', value: '1 año' },
    ];
    return renderQuestionPage(
      '¿Cuánto tiempo quieres entrenar?',
      options,
      duration,
      setDuration
    );
  };

  const renderQuestionPage = (
    title: string,
    options: Array<{ icon: any; title: string; subtitle?: string; value: string }>,
    selectedValue: string | null,
    onSelected: (value: string) => void
  ) => (
    <View style={styles.pageContainer}>
      <Text style={styles.questionTitle}>{title}</Text>
      <FlatList
        data={options}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => {
          const isSelected = selectedValue === item.value;
          return (
            <TouchableOpacity
              style={[
                styles.optionCard,
                isSelected && styles.optionCardSelected,
              ]}
              activeOpacity={0.8}
              onPress={() => onSelected(item.value)}
            >
              <View
                style={[
                  styles.iconContainer,
                  isSelected && styles.iconContainerSelected,
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={26}
                  color={isSelected ? '#FFC107' : '#AAA'}
                />
              </View>
              <View style={styles.optionTextContainer}>
                <Text
                  style={[
                    styles.optionTitle,
                    isSelected && styles.optionTitleSelected,
                  ]}
                >
                  {item.title}
                </Text>
                {item.subtitle && (
                  <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              {isSelected && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color="#FFC107"
                />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  return (
    <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          {currentPage > 0 && (
            <TouchableOpacity onPress={previousPage} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          )}
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${((currentPage + 1) / 6) * 100}%` }, // Corregido: 6 páginas
              ]}
            />
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={{ width }}>{renderGenderPage()}</View>
          <View style={{ width }}>{renderAgePage()}</View>
          <View style={{ width }}>{renderConditionPage()}</View>
          <View style={{ width }}>{renderGoalPage()}</View>
          <View style={{ width }}>{renderExperiencePage()}</View>
          <View style={{ width }}>{renderDurationPage()}</View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              (!canContinue() || isSubmitting) && styles.continueButtonDisabled,
            ]}
            onPress={nextPage}
            disabled={!canContinue() || isSubmitting}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={canContinue() ? ['#FFC107', '#FF9800'] : ['#444', '#444']}
              style={styles.gradient}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#0D0D0D" size="small" />
              ) : (
                <Text style={[
                  styles.continueButtonText,
                  (!canContinue() || isSubmitting) && styles.continueButtonTextDisabled
                ]}>
                  {currentPage === 5 ? 'Finalizar' : 'Continuar'}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 12,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFC107',
  },
  scrollView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    padding: 20,
  },
  questionTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: '#FFC107',
    backgroundColor: 'rgba(255,193,7,0.1)',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerSelected: {
    backgroundColor: 'rgba(255,193,7,0.2)',
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    color: '#CCC',
    fontSize: 16,
    fontWeight: '600',
  },
  optionTitleSelected: {
    color: '#FFF',
  },
  optionSubtitle: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,193,7,0.3)',
  },
  input: {
    color: '#FFF',
    fontSize: 18,
    padding: 20,
  },
  helperText: {
    color: '#888',
    fontSize: 13,
    marginTop: 8,
  },
  bottomContainer: {
    padding: 20,
  },
  continueButton: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#0D0D0D',
    fontSize: 18,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#888',
  },
});