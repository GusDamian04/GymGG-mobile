import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
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

const { width } = Dimensions.get('window');

// Tema de la app
const AppTheme = {
  backgroundColor: '#1a1a1a',
  cardColor: '#2a2a2a',
  accentColor: '#00ff88',
};

export const TrainingLevelForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [availableTime, setAvailableTime] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  const nextPage = () => {
    if (currentPage < 6) {
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
        return age !== null;
      case 2:
        return condition !== null;
      case 3:
        return goal !== null;
      case 4:
        return experience !== null;
      case 5:
        return duration !== null;
      case 6:
        return availableTime !== null;
      default:
        return false;
    }
  };

  const submitForm = () => {
    // Navegar con Expo Router y pasar parámetros
    // Cast to any to avoid strict typed route errors for routes not present in generated types
    
    router.replace({
      pathname: '/screens/training-result',
      params: {
        gender,
        age: age?.toString(),
        condition,
        goal,
        experience,
        duration,
        availableTime,
      },
    } as any);
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
          placeholderTextColor="#666"
          keyboardType="numeric"
          onChangeText={(value) => {
            const parsedAge = parseInt(value);
            if (parsedAge >= 12 && parsedAge <= 80) {
              setAge(parsedAge);
            } else {
              setAge(null);
            }
          }}
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
        icon: 'medical',
        title: 'Otro',
        subtitle: 'Consultar médico',
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

  const renderAvailableTimePage = () => {
    const options = [
      { icon: 'time', title: '30 minutos', value: '30 minutos' },
      { icon: 'time', title: '1 hora', value: '1 hora' },
      { icon: 'time', title: '1 hora y media', value: '1 hora y media' },
      { icon: 'time', title: '2 horas o más', value: '2 horas o más' },
    ];
    return renderQuestionPage(
      '¿Cuánto tiempo tienes disponible por día?',
      options,
      availableTime,
      setAvailableTime
    );
  };

  const renderQuestionPage = (title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, options: ArrayLike<any> | null | undefined, selectedValue: string | null, onSelected: { (value: React.SetStateAction<string | null>): void; (value: React.SetStateAction<string | null>): void; (value: React.SetStateAction<string | null>): void; (value: React.SetStateAction<string | null>): void; (value: React.SetStateAction<string | null>): void; (value: React.SetStateAction<string | null>): void; (arg0: any): void; }) => (
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
                  size={28}
                  color={isSelected ? AppTheme.accentColor : '#666'}
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
                  color={AppTheme.accentColor}
                />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
              { width: `${((currentPage + 1) / 7) * 100}%` },
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
        <View style={{ width }}>{renderAvailableTimePage()}</View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canContinue() && styles.continueButtonDisabled,
          ]}
          onPress={nextPage}
          disabled={!canContinue()}
        >
          <Text style={styles.continueButtonText}>
            {currentPage === 6 ? 'Finalizar' : 'Continuar'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.backgroundColor,
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
    backgroundColor: '#444',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: AppTheme.accentColor,
  },
  scrollView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    padding: 20,
  },
  questionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppTheme.cardColor,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: AppTheme.accentColor,
  },
  iconContainer: {
    padding: 12,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  iconContainerSelected: {
    backgroundColor: `${AppTheme.accentColor}33`,
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionTitleSelected: {
    color: 'white',
  },
  optionSubtitle: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: AppTheme.cardColor,
    borderRadius: 12,
    marginBottom: 10,
  },
  input: {
    color: 'white',
    fontSize: 18,
    padding: 20,
  },
  helperText: {
    color: '#666',
    fontSize: 12,
  },
  bottomContainer: {
    padding: 20,
  },
  continueButton: {
    backgroundColor: AppTheme.accentColor,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#444',
  },
  continueButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});