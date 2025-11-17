import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

interface RoutineData {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
}

const routinesByLevel: Record<string, RoutineData[]> = {
    beginner: [
        {
            id: 'beginner_legs_glutes',
            title: 'Pierna y Glúteos',
            description: 'Ejercicios fundamentales para comenzar',
            duration: '30-40 min',
            difficulty: 'Fácil',
            icon: 'fitness',
        },
        {
            id: 'beginner_back_arms',
            title: 'Espalda y Brazos',
            description: 'Fortalecimiento básico superior',
            duration: '25-35 min',
            difficulty: 'Fácil',
            icon: 'walk',
        },
        {
            id: 'beginner_abs_cardio',
            title: 'Abdominales y Cardio',
            description: 'Core y activación cardiovascular',
            duration: '20-30 min',
            difficulty: 'Fácil',
            icon: 'heart',
        },
    ],
    intermediate: [
        {
            id: 'intermediate_strength',
            title: 'Fuerza Completa',
            description: 'Trabajo de fuerza para todo el cuerpo',
            duration: '45-55 min',
            difficulty: 'Medio',
            icon: 'fitness',
        },
        {
            id: 'intermediate_hiit',
            title: 'HIIT Intermedio',
            description: 'Intervalos de alta intensidad',
            duration: '35-45 min',
            difficulty: 'Medio',
            icon: 'flame',
        },
        {
            id: 'intermediate_core',
            title: 'Core Power',
            description: 'Fortalecimiento del núcleo corporal',
            duration: '30-40 min',
            difficulty: 'Medio',
            icon: 'radio-button-on',
        },
    ],
    advanced: [
        {
            id: 'advanced_beast',
            title: 'Bestia Mode',
            description: 'Rutina extrema para atletas avanzados',
            duration: '60-75 min',
            difficulty: 'Difícil',
            icon: 'flash',
        },
        {
            id: 'advanced_warrior',
            title: 'Warrior Training',
            description: 'Entrenamiento de guerrero funcional',
            duration: '65-80 min',
            difficulty: 'Difícil',
            icon: 'shield',
        },
        {
            id: 'advanced_endurance',
            title: 'Resistencia Elite',
            description: 'Máxima resistencia y condición física',
            duration: '70-90 min',
            difficulty: 'Difícil',
            icon: 'timer',
        },
    ],
};

export default function RoutineSelectionScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { selectedLevel, fitnessLevel } = params;
    
    const [selectedRoutine, setSelectedRoutine] = useState<string>("");
    const scrollViewRef = useRef<ScrollView>(null);

    const currentRoutines = routinesByLevel[selectedLevel as string] || [];

    const getLevelTitle = () => {
        switch (selectedLevel) {
            case 'beginner':
                return 'Principiante';
            case 'intermediate':
                return 'Intermedio';
            case 'advanced':
                return 'Avanzado';
            default:
                return 'Nivel';
        }
    };

    const getLevelIcon = (): React.ComponentProps<typeof Ionicons>["name"] => {
        switch (selectedLevel) {
            case 'beginner':
                return 'walk';
            case 'intermediate':
                return 'walk';
            case 'advanced':
                return 'fitness';
            default:
                return 'fitness';
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
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

    const handleContinue = () => {
        const selectedRoutineData = currentRoutines.find(
            (routine) => routine.id === selectedRoutine
        );

        if (selectedRoutineData) {
            router.push({
                pathname: '/screens/routine-details',
                params: {
                    routineId: selectedRoutine,
                    routineName: selectedRoutineData.title,
                    level: getLevelTitle(),
                    difficulty: selectedRoutineData.difficulty,
                    fitnessLevel: selectedLevel,
                },
            } as any);
        }
    };

    return (
        <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Elige una rutina</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Level Info */}
                <View style={styles.levelCard}>
                    <View style={styles.levelIconContainer}>
                        <Ionicons 
                            name={getLevelIcon()} 
                            size={28} 
                            color="#FFC107" 
                        />
                    </View>
                    <View style={styles.levelTextContainer}>
                        <Text style={styles.levelTitle}>
                            Nivel {getLevelTitle()}
                        </Text>
                        <Text style={styles.levelSubtitle}>
                            {currentRoutines.length} rutinas disponibles
                        </Text>
                    </View>
                </View>

                {/* Routine Options */}
                <View style={styles.routineListContainer}>
                    <FlatList
                        data={currentRoutines}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const isSelected = selectedRoutine === item.id;
                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.routineCard,
                                        isSelected && styles.routineCardSelected,
                                    ]}
                                    onPress={() => setSelectedRoutine(item.id)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[
                                        styles.routineIconContainer,
                                        isSelected && styles.routineIconContainerSelected,
                                    ]}>
                                        <Ionicons
                                            name={item.icon}
                                            size={24}
                                            color={isSelected ? '#FFC107' : '#AAA'}
                                        />
                                    </View>

                                    <View style={styles.routineTextContainer}>
                                        <Text style={[
                                            styles.routineTitle,
                                            isSelected && styles.routineTitleSelected,
                                        ]}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.routineDescription}>
                                            {item.description}
                                        </Text>
                                    </View>

                                    <View style={styles.routineMetaContainer}>
                                        <View style={[
                                            styles.difficultyBadge,
                                            { backgroundColor: `${getDifficultyColor(item.difficulty)}33` }
                                        ]}>
                                            <Text style={[
                                                styles.difficultyText,
                                                { color: getDifficultyColor(item.difficulty) }
                                            ]}>
                                                {item.difficulty}
                                            </Text>
                                        </View>
                                        <Text style={styles.durationText}>{item.duration}</Text>
                                    </View>

                                    {isSelected && (
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={24}
                                            color="#FFC107"
                                            style={styles.checkIcon}
                                        />
                                    )}
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>

                {/* Bottom Button */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            !selectedRoutine && styles.continueButtonDisabled,
                        ]}
                        onPress={() => router.replace("/screens/routine-details")}
                        disabled={!selectedRoutine}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={selectedRoutine ? ['#FFC107', '#FF9800'] : ['#444', '#444']}
                            style={styles.gradient}
                        >
                            <Text style={[
                                styles.continueButtonText,
                                !selectedRoutine && styles.continueButtonTextDisabled
                            ]}>
                                Continuar
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginRight: 28,
    },
    levelCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,193,7,0.1)',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.3)',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    levelIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(255,193,7,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    levelTextContainer: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    levelTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    levelSubtitle: {
        color: '#AAA',
        fontSize: 14,
        marginTop: 2,
    },
    routineListContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    routineCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: 'transparent',
        position: 'relative',
    },
    routineCardSelected: {
        backgroundColor: 'rgba(255,193,7,0.1)',
        borderColor: '#FFC107',
    },
    routineIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    routineIconContainerSelected: {
        backgroundColor: 'rgba(255,193,7,0.2)',
    },
    routineTextContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    routineTitle: {
        color: '#CCC',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    routineTitleSelected: {
        color: '#FFF',
    },
    routineDescription: {
        color: '#888',
        fontSize: 13,
        lineHeight: 18,
    },
    routineMetaContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginLeft: 12,
    },
    difficultyBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 4,
    },
    difficultyText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    durationText: {
        color: '#AAA',
        fontSize: 12,
    },
    checkIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
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