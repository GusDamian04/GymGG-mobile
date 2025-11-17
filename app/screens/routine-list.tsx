import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Routine {
    id: string;
    name: string;
    level: string;
    difficulty: string;
    duration: string;
    exercisesCount: number;
    createdAt: Date;
}

const MOCK_ROUTINES: Routine[] = [
    {
        id: '1',
        name: 'Pierna y Glúteos',
        level: 'Principiante',
        difficulty: 'Fácil',
        duration: '30-40 min',
        exercisesCount: 3,
        createdAt: new Date('2025-01-15'),
    },
    {
        id: '2',
        name: 'Fuerza Completa',
        level: 'Intermedio',
        difficulty: 'Medio',
        duration: '45-55 min',
        exercisesCount: 4,
        createdAt: new Date('2025-01-20'),
    },
    {
        id: '3',
        name: 'Bestia Mode',
        level: 'Avanzado',
        difficulty: 'Difícil',
        duration: '60-75 min',
        exercisesCount: 5,
        createdAt: new Date('2025-02-01'),
    },
];

const FILTER_OPTIONS = ['Todas', 'Principiante', 'Intermedio', 'Avanzado'];

export default function RoutinesListScreen() {
    const router = useRouter();
    const [routines, setRoutines] = useState<Routine[]>(MOCK_ROUTINES);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('Todas');

    const filteredRoutines = routines.filter((routine) => {
        // Filter by level
        const matchesLevel = 
            selectedFilter === 'Todas' || 
            routine.level === selectedFilter;

        // Filter by search query
        const matchesSearch = 
            searchQuery === '' ||
            routine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            routine.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
            routine.difficulty.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesLevel && matchesSearch;
    });

    const deleteRoutine = (routine: Routine) => {
        Alert.alert(
            'Eliminar Rutina',
            `¿Estás seguro de que quieres eliminar "${routine.name}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        setRoutines(routines.filter((r) => r.id !== routine.id));
                    },
                },
            ]
        );
    };

    const navigateToRoutineDetails = (routine: Routine) => {
        router.push({
            pathname: '/screens/routine-details',
            params: {
                routineId: routine.id,
                routineName: routine.name,
                level: routine.level,
                difficulty: routine.difficulty,
                fitnessLevel: routine.level.toLowerCase(),
            },
        } as any);
    };

    const createNewRoutine = () => {
        router.push({
            pathname: '/screens/routine-details',
            params: {
                routineId: '',
                routineName: 'Nueva Rutina',
                level: 'Principiante',
                difficulty: 'Medio',
                fitnessLevel: 'beginner',
            },
        } as any);
    };

    const formatDate = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

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
                    <Text style={styles.headerTitle}>Mis Rutinas</Text>
                    <TouchableOpacity
                        onPress={() => {}}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="refresh" size={24} color="#FFC107" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#FFC107" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar rutinas..."
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Filter Chips */}
                    <FlatList
                        horizontal
                        data={FILTER_OPTIONS}
                        keyExtractor={(item) => item}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filterList}
                        renderItem={({ item }) => {
                            const isSelected = selectedFilter === item;
                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.filterChip,
                                        isSelected && styles.filterChipSelected,
                                    ]}
                                    onPress={() => setSelectedFilter(item)}
                                    activeOpacity={0.8}
                                >
                                    <Text
                                        style={[
                                            styles.filterChipText,
                                            isSelected && styles.filterChipTextSelected,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>

                {/* Routines List */}
                {filteredRoutines.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons
                            name={routines.length === 0 ? "fitness" : "search"}
                            size={64}
                            color="#555"
                        />
                        <Text style={styles.emptyStateTitle}>
                            {routines.length === 0
                                ? 'No tienes rutinas creadas'
                                : 'No se encontraron rutinas'}
                        </Text>
                        <Text style={styles.emptyStateSubtitle}>
                            {routines.length === 0
                                ? 'Crea tu primera rutina presionando el botón +'
                                : 'Intenta con otros términos de búsqueda'}
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredRoutines}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <RoutineCard
                                routine={item}
                                onPress={() => navigateToRoutineDetails(item)}
                                onDelete={() => deleteRoutine(item)}
                                formatDate={formatDate}
                            />
                        )}
                    />
                )}

                {/* Floating Action Button */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={createNewRoutine}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#FFC107', '#FF9800']}
                        style={styles.fabGradient}
                    >
                        <Ionicons name="add" size={28} color="white" />
                    </LinearGradient>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
}

interface RoutineCardProps {
    routine: Routine;
    onPress: () => void;
    onDelete: () => void;
    formatDate: (date: Date) => string;
}

function RoutineCard({ routine, onPress, onDelete, formatDate }: RoutineCardProps) {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <TouchableOpacity
            style={styles.routineCard}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.routineHeader}>
                <View style={styles.routineIconContainer}>
                    <Ionicons name="fitness" size={24} color="#FFC107" />
                </View>
                <View style={styles.routineInfo}>
                    <Text style={styles.routineName}>{routine.name}</Text>
                    <Text style={styles.routineSubtitle}>
                        {routine.level} • {routine.difficulty}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={onDelete}
                    activeOpacity={0.8}
                    style={styles.deleteButton}
                >
                    <Ionicons name="trash-outline" size={20} color="#F44336" />
                </TouchableOpacity>
            </View>

            <View style={styles.routineDetails}>
                <View style={styles.infoChip}>
                    <Ionicons name="time" size={14} color="#FFC107" />
                    <Text style={styles.infoChipText}>{routine.duration}</Text>
                </View>
                <View style={styles.infoChip}>
                    <Ionicons name="repeat" size={14} color="#FFC107" />
                    <Text style={styles.infoChipText}>
                        {routine.exercisesCount} ejercicios
                    </Text>
                </View>
            </View>

            <Text style={styles.routineDate}>
                Creado: {formatDate(routine.createdAt)}
            </Text>
        </TouchableOpacity>
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
        fontSize: 28,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
        marginLeft: 12,
    },
    filterList: {
        gap: 10,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    filterChipSelected: {
        backgroundColor: 'rgba(255,193,7,0.2)',
        borderColor: '#FFC107',
    },
    filterChipText: {
        color: '#AAA',
        fontSize: 14,
        fontWeight: '500',
    },
    filterChipTextSelected: {
        color: '#FFC107',
        fontWeight: 'bold',
    },
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyStateTitle: {
        color: '#AAA',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        textAlign: 'center',
    },
    emptyStateSubtitle: {
        color: '#777',
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
    routineCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.2)',
        padding: 16,
        marginBottom: 16,
    },
    routineHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    routineIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 10,
        backgroundColor: 'rgba(255,193,7,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    routineInfo: {
        flex: 1,
        marginLeft: 12,
    },
    routineName: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    routineSubtitle: {
        color: '#AAA',
        fontSize: 14,
        marginTop: 2,
    },
    deleteButton: {
        padding: 8,
    },
    routineDetails: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 8,
    },
    infoChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,193,7,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    infoChipText: {
        color: '#FFC107',
        fontSize: 12,
        fontWeight: '500',
    },
    routineDate: {
        color: '#777',
        fontSize: 12,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    fabGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});