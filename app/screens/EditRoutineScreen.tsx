import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const LEVEL_OPTIONS = ['Principiante', 'Intermedio', 'Avanzado'];
const DIFFICULTY_OPTIONS = ['Fácil', 'Moderado', 'Difícil', 'Extremo'];

export default function EditRoutineScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { routineName, level, difficulty, duration, frequency, equipment, benefits } = params;

    const isNewRoutine = !routineName || routineName === 'Nueva Rutina';

    const [name, setName] = useState((routineName as string) || '');
    const [selectedLevel, setSelectedLevel] = useState((level as string) || 'Principiante');
    const [selectedDifficulty, setSelectedDifficulty] = useState((difficulty as string) || 'Moderado');
    const [durationText, setDurationText] = useState((duration as string) || '');
    const [frequencyText, setFrequencyText] = useState((frequency as string) || '');
    const [equipmentText, setEquipmentText] = useState((equipment as string) || '');
    const [benefitsText, setBenefitsText] = useState((benefits as string) || '');

    const [hasChanges, setHasChanges] = useState(false);
    const [showLevelPicker, setShowLevelPicker] = useState(false);
    const [showDifficultyPicker, setShowDifficultyPicker] = useState(false);

    const handleChange = () => {
        if (!hasChanges) setHasChanges(true);
    };

    const saveRoutine = () => {
        if (!name.trim()) {
            Alert.alert('Error', 'El nombre de la rutina es requerido');
            return;
        }

        // Aquí normalmente guardarías en una API o estado global
        Alert.alert('Éxito', 'Rutina guardada correctamente', [
            {
                text: 'OK',
                onPress: () => router.back(),
            },
        ]);
    };

    const handleBackPress = () => {
        if (hasChanges) {
            Alert.alert(
                'Cambios sin guardar',
                '¿Quieres guardar los cambios antes de salir?',
                [
                    {
                        text: 'Salir sin guardar',
                        style: 'destructive',
                        onPress: () => router.back(),
                    },
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Guardar',
                        onPress: saveRoutine,
                    },
                ]
            );
        } else {
            router.back();
        }
    };

    return (
        <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackPress} activeOpacity={0.8}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {isNewRoutine ? 'Crear Rutina' : 'Editar Rutina'}
                    </Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Información Básica */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="information-circle-outline" size={24} color="#FFC107" />
                            <Text style={styles.cardTitle}>Información Básica</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Nombre de la rutina</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="fitness" size={20} color="#FFC107" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ej: Rutina de Piernas"
                                    placeholderTextColor="#888"
                                    value={name}
                                    onChangeText={(text) => {
                                        setName(text);
                                        handleChange();
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Nivel</Text>
                            <TouchableOpacity
                                style={styles.pickerButton}
                                onPress={() => setShowLevelPicker(!showLevelPicker)}
                                activeOpacity={0.8}
                            >
                                <Ionicons name="trending-up" size={20} color="#FFC107" />
                                <Text style={styles.pickerButtonText}>{selectedLevel}</Text>
                                <Ionicons name="chevron-down" size={20} color="#AAA" />
                            </TouchableOpacity>
                            {showLevelPicker && (
                                <View style={styles.pickerOptions}>
                                    {LEVEL_OPTIONS.map((option) => (
                                        <TouchableOpacity
                                            key={option}
                                            style={[
                                                styles.pickerOption,
                                                selectedLevel === option && styles.pickerOptionSelected,
                                            ]}
                                            onPress={() => {
                                                setSelectedLevel(option);
                                                setShowLevelPicker(false);
                                                handleChange();
                                            }}
                                            activeOpacity={0.8}
                                        >
                                            <Text
                                                style={[
                                                    styles.pickerOptionText,
                                                    selectedLevel === option && styles.pickerOptionTextSelected,
                                                ]}
                                            >
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Dificultad</Text>
                            <TouchableOpacity
                                style={styles.pickerButton}
                                onPress={() => setShowDifficultyPicker(!showDifficultyPicker)}
                                activeOpacity={0.8}
                            >
                                <Ionicons name="flame" size={20} color="#FFC107" />
                                <Text style={styles.pickerButtonText}>{selectedDifficulty}</Text>
                                <Ionicons name="chevron-down" size={20} color="#AAA" />
                            </TouchableOpacity>
                            {showDifficultyPicker && (
                                <View style={styles.pickerOptions}>
                                    {DIFFICULTY_OPTIONS.map((option) => (
                                        <TouchableOpacity
                                            key={option}
                                            style={[
                                                styles.pickerOption,
                                                selectedDifficulty === option && styles.pickerOptionSelected,
                                            ]}
                                            onPress={() => {
                                                setSelectedDifficulty(option);
                                                setShowDifficultyPicker(false);
                                                handleChange();
                                            }}
                                            activeOpacity={0.8}
                                        >
                                            <Text
                                                style={[
                                                    styles.pickerOptionText,
                                                    selectedDifficulty === option && styles.pickerOptionTextSelected,
                                                ]}
                                            >
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Detalles de Entrenamiento */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="time-outline" size={24} color="#FFC107" />
                            <Text style={styles.cardTitle}>Detalles de Entrenamiento</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Duración (ej: 45 min)</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="timer-outline" size={20} color="#FFC107" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ej: 45-60 minutos"
                                    placeholderTextColor="#888"
                                    value={durationText}
                                    onChangeText={(text) => {
                                        setDurationText(text);
                                        handleChange();
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Frecuencia (ej: 3 veces por semana)</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="repeat" size={20} color="#FFC107" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ej: 3-4 veces por semana"
                                    placeholderTextColor="#888"
                                    value={frequencyText}
                                    onChangeText={(text) => {
                                        setFrequencyText(text);
                                        handleChange();
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Equipo necesario</Text>
                            <View style={[styles.inputContainer, styles.multilineInput]}>
                                <Ionicons name="build-outline" size={20} color="#FFC107" style={styles.multilineIcon} />
                                <TextInput
                                    style={[styles.input, styles.multilineTextInput]}
                                    placeholder="Ej: Mancuernas, banco, barra"
                                    placeholderTextColor="#888"
                                    multiline
                                    numberOfLines={2}
                                    value={equipmentText}
                                    onChangeText={(text) => {
                                        setEquipmentText(text);
                                        handleChange();
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Beneficios */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="heart-outline" size={24} color="#FFC107" />
                            <Text style={styles.cardTitle}>Beneficios</Text>
                        </View>
                        <Text style={styles.cardSubtitle}>Separa cada beneficio con una coma</Text>

                        <View style={styles.inputGroup}>
                            <View style={[styles.inputContainer, styles.multilineInput]}>
                                <Ionicons name="star-outline" size={20} color="#FFC107" style={styles.multilineIcon} />
                                <TextInput
                                    style={[styles.input, styles.multilineTextInput]}
                                    placeholder="Ej: Fortalecimiento muscular, Mejora de resistencia"
                                    placeholderTextColor="#888"
                                    multiline
                                    numberOfLines={3}
                                    value={benefitsText}
                                    onChangeText={(text) => {
                                        setBenefitsText(text);
                                        handleChange();
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Save Button */}
                    {hasChanges && (
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={saveRoutine}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#FFC107', '#FF9800']}
                                style={styles.gradient}
                            >
                                <Ionicons name="save" size={24} color="white" />
                                <Text style={styles.saveButtonText}>
                                    {isNewRoutine ? 'Crear Rutina' : 'Guardar Cambios'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </ScrollView>
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
        justifyContent: 'space-between',
        padding: 20,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.2)',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 8,
    },
    cardTitle: {
        color: '#FFC107',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        color: '#AAA',
        fontSize: 12,
        marginBottom: 12,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        color: '#AAA',
        fontSize: 14,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    input: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
    },
    multilineInput: {
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    multilineIcon: {
        marginTop: 2,
    },
    multilineTextInput: {
        minHeight: 60,
        textAlignVertical: 'top',
    },
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    pickerButtonText: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
    },
    pickerOptions: {
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        marginTop: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.3)',
        overflow: 'hidden',
    },
    pickerOption: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    pickerOptionSelected: {
        backgroundColor: 'rgba(255,193,7,0.1)',
    },
    pickerOptionText: {
        color: '#AAA',
        fontSize: 16,
    },
    pickerOptionTextSelected: {
        color: '#FFC107',
        fontWeight: '600',
    },
    saveButton: {
        width: '100%',
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginTop: 16,
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});