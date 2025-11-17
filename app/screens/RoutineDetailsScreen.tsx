import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Exercise {
    id: string;
    name: string;
    target: string;
    sets: string;
    rest: string;
    difficulty: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
}

export default function RoutineDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { routineId, routineName, level, difficulty, fitnessLevel } = params;

    const [exercises, setExercises] = useState<Exercise[]>(getInitialExercises());

    function getInitialExercises(): Exercise[] {
        const levelStr = (fitnessLevel || level)?.toString().toLowerCase();
        
        switch (levelStr) {
            case 'beginner':
            case 'principiante':
                return [
                    {
                        id: '1',
                        name: 'Sentadillas básicas',
                        target: 'Piernas, glúteos',
                        sets: '3 series x 8-12 reps',
                        rest: '60 seg',
                        difficulty: 'Fácil',
                        icon: 'fitness',
                    },
                    {
                        id: '2',
                        name: 'Flexiones de rodillas',
                        target: 'Pecho, brazos',
                        sets: '3 series x 5-10 reps',
                        rest: '60 seg',
                        difficulty: 'Fácil',
                        icon: 'walk',
                    },
                    {
                        id: '3',
                        name: 'Plancha básica',
                        target: 'Core',
                        sets: '3 series x 20-30 seg',
                        rest: '45 seg',
                        difficulty: 'Fácil',
                        icon: 'body',
                    },
                ];
            case 'advanced':
            case 'avanzado':
                return [
                    {
                        id: '1',
                        name: 'Sentadillas con peso',
                        target: 'Piernas, glúteos',
                        sets: '4 series x 8-10 reps',
                        rest: '90-120 seg',
                        difficulty: 'Difícil',
                        icon: 'fitness',
                    },
                    {
                        id: '2',
                        name: 'Peso muerto',
                        target: 'Espalda, piernas',
                        sets: '4 series x 6-8 reps',
                        rest: '120 seg',
                        difficulty: 'Difícil',
                        icon: 'barbell',
                    },
                    {
                        id: '3',
                        name: 'Press de banca',
                        target: 'Pecho, hombros',
                        sets: '4 series x 8-10 reps',
                        rest: '90-120 seg',
                        difficulty: 'Difícil',
                        icon: 'body',
                    },
                ];
            default: // intermediate
                return [
                    {
                        id: '1',
                        name: 'Sentadillas con sumo',
                        target: 'Piernas, glúteos',
                        sets: '3 series x 12-15 reps',
                        rest: '60-90 seg',
                        difficulty: 'Medio',
                        icon: 'fitness',
                    },
                    {
                        id: '2',
                        name: 'Búlgaras',
                        target: 'Cuádriceps, glúteos',
                        sets: '3 series x 10-12 reps',
                        rest: '60 seg',
                        difficulty: 'Medio',
                        icon: 'walk',
                    },
                    {
                        id: '3',
                        name: 'Extensiones',
                        target: 'Cuádriceps',
                        sets: '3 series x 12-15 reps',
                        rest: '45-60 seg',
                        difficulty: 'Fácil',
                        icon: 'body',
                    },
                    {
                        id: '4',
                        name: 'Hip thrust',
                        target: 'Glúteos, isquiotibiales',
                        sets: '3 series x 12-15 reps',
                        rest: '60-90 seg',
                        difficulty: 'Medio',
                        icon: 'barbell',
                    },
                ];
        }
    }

    const getRoutineInfo = () => {
        const levelStr = (fitnessLevel || level)?.toString().toLowerCase();
        
        const durationMap: Record<string, string> = {
            'beginner': '30-45 minutos',
            'principiante': '30-45 minutos',
            'intermediate': '45-60 minutos',
            'intermedio': '45-60 minutos',
            'advanced': '60-90 minutos',
            'avanzado': '60-90 minutos',
        };

        const frequencyMap: Record<string, string> = {
            'beginner': '2-3 veces por semana',
            'principiante': '2-3 veces por semana',
            'intermediate': '3-4 veces por semana',
            'intermedio': '3-4 veces por semana',
            'advanced': '4-5 veces por semana',
            'avanzado': '4-5 veces por semana',
        };

        const equipmentMap: Record<string, string> = {
            'beginner': 'Peso corporal, mancuernas ligeras',
            'principiante': 'Peso corporal, mancuernas ligeras',
            'intermediate': 'Mancuernas, banco, barras',
            'intermedio': 'Mancuernas, banco, barras',
            'advanced': 'Equipamiento completo de gimnasio',
            'avanzado': 'Equipamiento completo de gimnasio',
        };

        const benefitsMap: Record<string, string[]> = {
            'beginner': [
                'Introducción al ejercicio',
                'Construcción de hábitos',
                'Fortalecimiento básico',
            ],
            'principiante': [
                'Introducción al ejercicio',
                'Construcción de hábitos',
                'Fortalecimiento básico',
            ],
            'intermediate': [
                'Fortalecimiento muscular',
                'Mejora de la resistencia',
                'Tonificación corporal',
            ],
            'intermedio': [
                'Fortalecimiento muscular',
                'Mejora de la resistencia',
                'Tonificación corporal',
            ],
            'advanced': [
                'Hipertrofia muscular',
                'Fuerza máxima',
                'Definición avanzada',
            ],
            'avanzado': [
                'Hipertrofia muscular',
                'Fuerza máxima',
                'Definición avanzada',
            ],
        };

        return {
            duration: durationMap[levelStr] || '45-60 minutos',
            frequency: frequencyMap[levelStr] || '3-4 veces por semana',
            equipment: equipmentMap[levelStr] || 'Mancuernas, banco',
            benefits: benefitsMap[levelStr] || [
                'Fortalecimiento muscular',
                'Mejora de la resistencia',
                'Tonificación corporal',
            ],
        };
    };

    const getDifficultyColor = (diff: string) => {
        switch (diff.toLowerCase()) {
            case 'fácil':
                return '#4CAF50';
            case 'medio':
                return '#FF9800';
            case 'difícil':
                return '#F44336';
            default:
                return '#FFC107';
        }
    };

    const deleteExercise = (exerciseId: string) => {
        Alert.alert(
            'Eliminar ejercicio',
            '¿Estás seguro de que quieres eliminar este ejercicio?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        setExercises(exercises.filter((ex) => ex.id !== exerciseId));
                    },
                },
            ]
        );
    };

    const startRoutine = () => {
        router.push({
            pathname: '/screens/routine-execution',
            params: {
                routineName,
                level,
                exercises: JSON.stringify(exercises),
            },
        } as any);
    };

    const routineInfo = getRoutineInfo();

    return (
        <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>{routineName}</Text>
                        <Text style={styles.headerSubtitle}>
                            Nivel {level} • {difficulty}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/screens/ProfileScreen' as any)}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="person" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Routine Info Card */}
                    <View style={styles.infoCard}>
                        <Text style={styles.sectionTitle}>Información de la rutina</Text>
                        
                        <InfoRow
                            icon="time"
                            label="Duración"
                            value={routineInfo.duration}
                        />
                        <InfoRow
                            icon="calendar"
                            label="Frecuencia"
                            value={routineInfo.frequency}
                        />
                        <InfoRow
                            icon="barbell"
                            label="Equipo"
                            value={routineInfo.equipment}
                        />

                        <Text style={styles.benefitsTitle}>Beneficios principales:</Text>
                        {routineInfo.benefits.map((benefit, index) => (
                            <View key={index} style={styles.benefitRow}>
                                <View style={styles.benefitDot} />
                                <Text style={styles.benefitText}>{benefit}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Exercises List */}
                    <View style={styles.exercisesSection}>
                        <View style={styles.exercisesHeader}>
                            <Text style={styles.sectionTitle}>Ejercicios incluidos</Text>
                            <Text style={styles.exercisesCount}>
                                {exercises.length} ejercicios
                            </Text>
                        </View>

                        {exercises.map((exercise) => (
                            <ExerciseCard
                                key={exercise.id}
                                exercise={exercise}
                                onDelete={() => deleteExercise(exercise.id)}
                                getDifficultyColor={getDifficultyColor}
                            />
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.startButton}
                            onPress={() => router.push({
                                pathname: '/screens/RoutineExecutionScreen',
                                params: {
                                    routineName, 
                                    level, 
                                    exercises: JSON.stringify(exercises)
                                }
                            } as any)}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#FFC107', '#FF9800']}
                                style={styles.gradient}
                            >
                                <Ionicons name="play" size={24} color="#0D0D0D" />
                                <Text style={styles.startButtonText}>Comenzar Rutina</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ComponentProps<typeof Ionicons>["name"]; label: string; value: string }) {
    return (
        <View style={styles.infoRow}>
            <Ionicons name={icon} size={20} color="#FFC107" />
            <Text style={styles.infoLabel}>{label}: </Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

function ExerciseCard({ exercise, onDelete, getDifficultyColor }: {
    exercise: Exercise;
    onDelete: () => void;
    getDifficultyColor: (diff: string) => string;
}) {
    return (
        <View style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
                <View style={styles.exerciseIconContainer}>
                    <Ionicons name={exercise.icon} size={24} color="#FFC107" />
                </View>
                <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseTarget}>{exercise.target}</Text>
                </View>
                <View style={[
                    styles.difficultyBadge,
                    { backgroundColor: `${getDifficultyColor(exercise.difficulty)}33` }
                ]}>
                    <Text style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(exercise.difficulty) }
                    ]}>
                        {exercise.difficulty}
                    </Text>
                </View>
                <TouchableOpacity onPress={onDelete} activeOpacity={0.8}>
                    <Ionicons name="trash" size={20} color="#F44336" />
                </TouchableOpacity>
            </View>
            <View style={styles.exerciseDetails}>
                <View style={styles.exerciseDetail}>
                    <Ionicons name="repeat" size={16} color="#AAA" />
                    <Text style={styles.exerciseDetailText}>{exercise.sets}</Text>
                </View>
                <View style={styles.exerciseDetail}>
                    <Ionicons name="timer" size={16} color="#AAA" />
                    <Text style={styles.exerciseDetailText}>{exercise.rest}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 12,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: '#AAA',
        fontSize: 16,
        marginTop: 2,
    },
    scrollView: {
        flex: 1,
    },
    infoCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        padding: 20,
        margin: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.3)',
    },
    sectionTitle: {
        color: '#FFC107',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoLabel: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 12,
    },
    infoValue: {
        color: '#AAA',
        fontSize: 14,
        flex: 1,
    },
    benefitsTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    benefitDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FFC107',
        marginRight: 8,
    },
    benefitText: {
        color: '#AAA',
        fontSize: 14,
    },
    exercisesSection: {
        padding: 20,
        paddingTop: 0,
    },
    exercisesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    exercisesCount: {
        color: '#AAA',
        fontSize: 14,
    },
    exerciseCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.2)',
    },
    exerciseHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12,
    },
    exerciseIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(255,193,7,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exerciseInfo: {
        flex: 1,
    },
    exerciseName: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    exerciseTarget: {
        color: '#AAA',
        fontSize: 12,
        marginTop: 2,
    },
    difficultyBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    difficultyText: {
        fontSize: 12,
        fontWeight: '600',
    },
    exerciseDetails: {
        flexDirection: 'row',
        gap: 16,
    },
    exerciseDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    exerciseDetailText: {
        color: '#AAA',
        fontSize: 12,
    },
    actionButtons: {
        padding: 20,
        paddingBottom: 40,
    },
    startButton: {
        width: '100%',
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    startButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0D0D0D',
    },
});