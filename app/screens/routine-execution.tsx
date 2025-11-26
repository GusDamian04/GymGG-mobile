import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    TextInput,
    Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Exercise {
    name: string;
    target: string;
    sets: string;
    rest: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
}

interface SetData {
    reps: number;
    weight: number;
    completed: boolean;
}

export default function RoutineExecutionScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { routineName, level, exercises: exercisesParam } = params;

    // Validar que exercisesParam existe antes de parsear
    if (!exercisesParam || exercisesParam === 'undefined') {
        return (
            <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                        <Ionicons name="alert-circle" size={64} color="#FFC107" />
                        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>
                            Error al cargar ejercicios
                        </Text>
                        <Text style={{ color: '#AAA', fontSize: 14, marginTop: 8, textAlign: 'center' }}>
                            No se encontraron ejercicios para esta rutina
                        </Text>
                        <TouchableOpacity
                            style={{ marginTop: 30, paddingHorizontal: 32, paddingVertical: 12, borderRadius: 25, backgroundColor: '#FFC107' }}
                            onPress={() => router.back()}
                            activeOpacity={0.8}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    const exercises: Exercise[] = JSON.parse(exercisesParam as string);

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    const [isResting, setIsResting] = useState(false);
    const [restSeconds, setRestSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [activeSeconds, setActiveSeconds] = useState(0);
    const [restTimeUsed, setRestTimeUsed] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showSetModal, setShowSetModal] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const [reps, setReps] = useState("10");
    const [weight, setWeight] = useState("0");

    // Tracking de sets completados
    const [completedSets, setCompletedSets] = useState<SetData[][]>(
        exercises.map(() => Array(3).fill({ reps: 0, weight: 0, completed: false }))
    );

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const totalSets = extractSetsCount(exercises[currentExerciseIndex].sets);
    const plannedRest = extractRestTime(exercises[currentExerciseIndex].rest);

    useEffect(() => {
        // Timer global
        intervalRef.current = setInterval(() => {
            setTotalSeconds((prev) => prev + 1);
            if (!isResting) {
                setActiveSeconds((prev) => prev + 1);
            }
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isResting]);

    useEffect(() => {
        // Timer de descanso
        if (isResting && restSeconds > 0) {
            const restTimer = setInterval(() => {
                setRestSeconds((prev) => {
                    if (prev <= 1) {
                        finishRest();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(restTimer);
        }
    }, [isResting, restSeconds]);

    function extractSetsCount(setsText: string): number {
        const match = setsText.match(/(\d+)\s*series/);
        return match ? parseInt(match[1]) : 3;
    }

    function extractRestTime(restText: string): number {
        const match = restText.match(/(\d+)/);
        return match ? parseInt(match[1]) : 60;
    }

    function startRest() {
        setIsResting(true);
        setRestSeconds(plannedRest);
    }

    function finishRest() {
        setIsResting(false);
        setRestSeconds(0);
        setRestTimeUsed((prev) => prev + plannedRest);
    }

    function skipRest() {
        finishRest();
    }

    function completeSet() {
        setShowSetModal(true);
    }

    function confirmSetCompletion() {
        const newCompletedSets = [...completedSets];
        newCompletedSets[currentExerciseIndex][currentSet - 1] = {
            reps: parseInt(reps) || 0,
            weight: parseFloat(weight) || 0,
            completed: true,
        };
        setCompletedSets(newCompletedSets);

        setShowSetModal(false);

        if (currentSet < totalSets) {
            setCurrentSet(currentSet + 1);
            startRest();
        } else {
            completeExercise();
        }
    }

    function completeExercise() {
        if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setCurrentSet(1);
            setIsResting(false);
        } else {
            finishWorkout();
        }
    }

    function nextExercise() {
        if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setCurrentSet(1);
            setIsResting(false);
        }
    }

    function previousExercise() {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
            setCurrentSet(1);
            setIsResting(false);
        }
    }

    function finishWorkout() {
        setIsCompleted(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }

    function formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function exitWorkout() {
        Alert.alert(
            '¿Abandonar rutina?',
            `Si sales ahora perderás el progreso.\n\nTiempo transcurrido: ${formatTime(totalSeconds)}`,
            [
                { text: 'Continuar', style: 'cancel' },
                { text: 'Salir', style: 'destructive', onPress: () => router.back() },
            ]
        );
    }

    const currentExercise = exercises[currentExerciseIndex];
    const completedInCurrentExercise = completedSets[currentExerciseIndex].filter(
        (s) => s.completed
    ).length;
    const overallProgress = (currentExerciseIndex + 1) / exercises.length;
    const exerciseProgress = completedInCurrentExercise / totalSets;

    const totalCompletedSets = completedSets.flat().filter((s) => s.completed).length;
    const totalVolume = completedSets
        .flat()
        .filter((s) => s.completed)
        .reduce((sum, set) => sum + set.weight * set.reps, 0);

    if (isCompleted) {
        return (
            <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.completionContent}>
                        <Ionicons name="trophy" size={100} color="#FFC107" />
                        <Text style={styles.completionTitle}>¡Rutina Completada!</Text>
                        <Text style={styles.completionSubtitle}>{routineName}</Text>

                        <View style={styles.statsCard}>
                            <StatRow label="Duración total" value={formatTime(totalSeconds)} />
                            <StatRow label="Tiempo activo" value={formatTime(activeSeconds)} />
                            <StatRow label="Series completadas" value={`${totalCompletedSets}`} />
                            <StatRow label="Ejercicios" value={`${exercises.length}`} />
                        </View>

                        <TouchableOpacity
                            style={styles.finishButton}
                            onPress={() => router.replace("/screens/home-screen")}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#FFC107', '#FF9800']}
                                style={styles.gradient}
                            >
                                <Ionicons name="home" size={24} color="white" />
                                <Text style={styles.finishButtonText}>Finalizar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={exitWorkout} activeOpacity={0.8}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerTitle}>{routineName}</Text>
                        <Text style={styles.headerTime}>{formatTime(totalSeconds)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowPreview(!showPreview)}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name={showPreview ? "fitness" : "list"}
                            size={24}
                            color="#FFC107"
                        />
                    </TouchableOpacity>
                </View>

                {/* Progress */}
                <View style={styles.progressSection}>
                    <View style={styles.progressRow}>
                        <Text style={styles.progressLabel}>Progreso general</Text>
                        <Text style={styles.progressValue}>
                            {currentExerciseIndex + 1}/{exercises.length}
                        </Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${overallProgress * 100}%` }]} />
                    </View>

                    <View style={styles.progressRow}>
                        <Text style={styles.progressLabel}>Serie actual</Text>
                        <Text style={styles.progressValue}>
                            {completedInCurrentExercise}/{totalSets}
                        </Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${exerciseProgress * 100}%`, backgroundColor: '#FF9800' },
                            ]}
                        />
                    </View>
                </View>

                {/* Time Stats */}
                <View style={styles.timeStats}>
                    <TimeStatItem icon="timer" label="Total" value={formatTime(totalSeconds)} />
                    <TimeStatItem icon="fitness" label="Activo" value={formatTime(activeSeconds)} />
                    <TimeStatItem icon="pause" label="Descanso" value={formatTime(restTimeUsed)} />
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {showPreview ? (
                        <PreviewList
                            exercises={exercises}
                            currentIndex={currentExerciseIndex}
                        />
                    ) : isResting ? (
                        <RestSection
                            seconds={restSeconds}
                            onSkip={skipRest}
                        />
                    ) : (
                        <ExerciseSection
                            exercise={currentExercise}
                            currentSet={currentSet}
                            totalSets={totalSets}
                            completedSets={completedSets[currentExerciseIndex]}
                            onComplete={completeSet}
                            onNext={nextExercise}
                            onPrevious={previousExercise}
                            showPrevious={currentExerciseIndex > 0}
                            showNext={currentExerciseIndex < exercises.length - 1}
                        />
                    )}
                </ScrollView>

                {/* Set Completion Modal */}
                <Modal
                    visible={showSetModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowSetModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Serie {currentSet} completada</Text>
                            <Text style={styles.modalSubtitle}>{currentExercise.name}</Text>


                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalCancelButton}
                                    onPress={() => setShowSetModal(false)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.modalCancelText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalConfirmButton}
                                    onPress={confirmSetCompletion}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.modalConfirmText}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </LinearGradient>
    );
}

function TimeStatItem({ icon, label, value }: {
    icon: React.ComponentProps<typeof Ionicons>["name"];
    label: string;
    value: string;
}) {
    return (
        <View style={styles.timeStatItem}>
            <Ionicons name={icon} size={16} color="#FFC107" />
            <Text style={styles.timeStatLabel}>{label}</Text>
            <Text style={styles.timeStatValue}>{value}</Text>
        </View>
    );
}

function StatRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.statRow}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );
}

function PreviewList({ exercises, currentIndex }: { exercises: Exercise[]; currentIndex: number }) {
    return (
        <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Vista previa de ejercicios</Text>
            {exercises.map((exercise, index) => (
                <View
                    key={index}
                    style={[
                        styles.previewCard,
                        index === currentIndex && styles.previewCardActive,
                    ]}
                >
                    {index === currentIndex && (
                        <Ionicons name="play" size={20} color="#FFC107" style={{ marginRight: 8 }} />
                    )}
                    <View style={{ flex: 1 }}>
                        <Text
                            style={[
                                styles.previewName,
                                index === currentIndex && styles.previewNameActive,
                            ]}
                        >
                            {exercise.name}
                        </Text>
                        <Text style={styles.previewTarget}>{exercise.target}</Text>
                        <Text style={styles.previewSets}>{exercise.sets}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

function RestSection({ seconds, onSkip }: { seconds: number; onSkip: () => void }) {
    return (
        <View style={styles.restContainer}>
            <Text style={styles.restTitle}>Tiempo de descanso</Text>
            <View style={styles.restCircle}>
                <Text style={styles.restTime}>
                    {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
                </Text>
                <Text style={styles.restLabel}>DESCANSANDO</Text>
            </View>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip} activeOpacity={0.8}>
                <Text style={styles.skipButtonText}>Omitir</Text>
            </TouchableOpacity>
        </View>
    );
}

function ExerciseSection({
    exercise,
    currentSet,
    totalSets,
    completedSets,
    onComplete,
    onNext,
    onPrevious,
    showPrevious,
    showNext,
}: {
    exercise: Exercise;
    currentSet: number;
    totalSets: number;
    completedSets: SetData[];
    onComplete: () => void;
    onNext: () => void;
    onPrevious: () => void;
    showPrevious: boolean;
    showNext: boolean;
}) {
    return (
        <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseTarget}>{exercise.target}</Text>

            <View style={styles.exerciseCard}>
                <View style={styles.exerciseIconContainer}>
                    <Ionicons name={exercise.icon} size={40} color="#FFC107" />
                </View>
                <Text style={styles.setNumber}>Serie {currentSet}</Text>
                <Text style={styles.setSuggestion}>{exercise.sets}</Text>

                {/* Previous Sets History */}
                {completedSets.some((s) => s.completed) && (
                    <View style={styles.history}>
                        <Text style={styles.historyTitle}>Series anteriores:</Text>
                        {completedSets.map(
                            (set, index) =>
                                set.completed && (
                                    <Text key={index} style={styles.historyText}>
                                        Serie {index + 1}: {set.reps} reps • {set.weight} kg
                                    </Text>
                                )
                        )}
                    </View>
                )}

                {/* Sets Indicator */}
                <View style={styles.setsIndicator}>
                    {Array.from({ length: totalSets }).map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.setDot,
                                completedSets[index]?.completed && styles.setDotCompleted,
                                index === currentSet - 1 && styles.setDotCurrent,
                            ]}
                        />
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.completeButton} onPress={onComplete} activeOpacity={0.8}>
                <LinearGradient colors={['#FFC107', '#FF9800']} style={styles.gradient}>
                    <Ionicons name="checkmark" size={24} color="white" />
                    <Text style={styles.completeButtonText}>Completar Serie {currentSet}</Text>
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.navigationButtons}>
                {showPrevious && (
                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={onPrevious}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="chevron-back" size={20} color="#AAA" />
                        <Text style={styles.navButtonText}>Anterior</Text>
                    </TouchableOpacity>
                )}
                {showNext && (
                    <TouchableOpacity
                        style={[styles.navButton, styles.navButtonNext]}
                        onPress={onNext}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.navButtonText, styles.navButtonTextNext]}>Siguiente</Text>
                        <Ionicons name="chevron-forward" size={20} color="#FFC107" />
                    </TouchableOpacity>
                )}
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
        justifyContent: 'space-between',
        padding: 20,
    },
    headerInfo: {
        flex: 1,
        marginLeft: 12,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerTime: {
        color: '#AAA',
        fontSize: 14,
    },
    progressSection: {
        padding: 20,
        paddingTop: 0,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabel: {
        color: '#AAA',
        fontSize: 16,
    },
    progressValue: {
        color: '#FFC107',
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 4,
        marginBottom: 16,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FFC107',
    },
    timeStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.3)',
    },
    timeStatItem: {
        alignItems: 'center',
    },
    timeStatLabel: {
        color: '#AAA',
        fontSize: 12,
        marginTop: 4,
    },
    timeStatValue: {
        color: '#FFC107',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 2,
    },
    content: {
        flex: 1,
    },
    previewContainer: {
        padding: 20,
    },
    previewTitle: {
        color: '#FFC107',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    previewCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.2)',
    },
    previewCardActive: {
        backgroundColor: 'rgba(255,193,7,0.2)',
        borderColor: '#FFC107',
        borderWidth: 2,
    },
    previewName: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    previewNameActive: {
        color: '#FFC107',
    },
    previewTarget: {
        color: '#AAA',
        fontSize: 12,
        marginTop: 2,
    },
    previewSets: {
        color: '#777',
        fontSize: 12,
    },
    restContainer: {
        padding: 20,
        alignItems: 'center',
    },
    restTitle: {
        color: '#FFC107',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    restCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255,193,7,0.1)',
        borderWidth: 3,
        borderColor: '#FFC107',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    restTime: {
        color: '#FFC107',
        fontSize: 48,
        fontWeight: 'bold',
    },
    restLabel: {
        color: '#AAA',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
    },
    skipButton: {
        backgroundColor: '#FFC107',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 25,
    },
    skipButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    exerciseContainer: {
        padding: 20,
    },
    exerciseName: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    exerciseTarget: {
        color: '#AAA',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 30,
    },
    exerciseCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        padding: 24,
        borderWidth: 2,
        borderColor: 'rgba(255,193,7,0.3)',
        alignItems: 'center',
        marginBottom: 20,
    },
    exerciseIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,193,7,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    setNumber: {
        color: '#FFC107',
        fontSize: 24,
        fontWeight: 'bold',
    },
    setSuggestion: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 8,
    },
    history: {
        marginTop: 20,
        alignSelf: 'stretch',
    },
    historyTitle: {
        color: '#AAA',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    historyText: {
        color: '#FFC107',
        fontSize: 12,
        marginBottom: 4,
    },
    setsIndicator: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 20,
    },
    setDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    setDotCompleted: {
        backgroundColor: '#FFC107',
    },
    setDotCurrent: {
        backgroundColor: 'rgba(255,193,7,0.5)',
    },
    completeButton: {
        width: '100%',
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginBottom: 12,
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    completeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    navigationButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    navButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingVertical: 12,
        gap: 8,
    },
    navButtonNext: {
        borderColor: '#FFC107',
    },
    navButtonText: {
        color: '#AAA',
        fontSize: 16,
    },
    navButtonTextNext: {
        color: '#FFC107',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#2A2A2A',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalSubtitle: {
        color: '#FFC107',
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 16,
        color: '#FFF',
        fontSize: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.3)',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
    },
    modalCancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#AAA',
        alignItems: 'center',
    },
    modalCancelText: {
        color: '#AAA',
        fontSize: 16,
        fontWeight: '600',
    },
    modalConfirmButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: '#FFC107',
        alignItems: 'center',
    },
    modalConfirmText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    completionContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    completionTitle: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center',
    },
    completionSubtitle: {
        color: '#FFC107',
        fontSize: 24,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 40,
        textAlign: 'center',
    },
    statsCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.3)',
        marginBottom: 50,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    statLabel: {
        color: '#AAA',
        fontSize: 16,
    },
    statValue: {
        color: '#FFC107',
        fontSize: 16,
        fontWeight: 'bold',
    },
    finishButton: {
        width: '100%',
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
    },
    finishButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12,
    },
});