import { LinearGradient } from "expo-linear-gradient";
import { router, useRouter } from "expo-router";
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    profileIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,193,7,0.1)',
        borderWidth: 2,
        borderColor: 'rgba(255,193,7,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        flex: 1,
        marginLeft: 16,
    },
    greeting: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#AAA',
        fontSize: 14,
        marginTop: 2,
    },
    logoutButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(244,67,54,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeCard: {
        borderRadius: 20,
        padding: 24,
        marginBottom: 32,
        shadowColor: '#FFC107',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    welcomeContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
    },
    welcomeIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        color: '#FFC107',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    menuGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    menuButton: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        minHeight: 120,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    menuButtonTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    menuButtonSubtitle: {
        color: '#AAA',
        fontSize: 12,
    },
    createButton: {
        width: '100%',
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginBottom: 12,
        shadowColor: '#FFC107',
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
    syncButton: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FFC107',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    syncButtonText: {
        color: '#FFC107',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default function HomeScreen() {
    const router = useRouter();
    const [userName] = useState("Usuario");

    const handleLogout = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar Sesión',
                    style: 'destructive',
                    onPress: () => {
                        router.replace('/screens/SingIn')
                    },
                },
            ]
        );
    };

    const navigateToRoutines = () => {
        router.push('/screens/routine-list' as any);
    };

    const navigateToHistory = () => {
        Alert.alert('Próximamente', 'Esta función estará disponible pronto 🚀');
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

    return (
        <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.profileIcon}>
                            <Ionicons name="person" size={28} color="#FFC107" />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={styles.greeting}>Hola, {userName}! 👋</Text>
                            <Text style={styles.subtitle}>Bienvenido a tu gimnasio virtual</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={() => router.replace("/screens/SingIn")}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="log-out-outline" size={20} color="#F44336" />
                        </TouchableOpacity>
                    </View>

                    {/* Welcome Card */}
                    <LinearGradient
                        colors={['#FFC107', '#FF9800']}
                        style={styles.welcomeCard}
                    >
                        <View style={styles.welcomeContent}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.welcomeTitle}>💪 Es hora de entrenar</Text>
                                <Text style={styles.welcomeSubtitle}>
                                    Tu cuerpo te lo agradecerá después
                                </Text>
                            </View>
                            <View style={styles.welcomeIcon}>
                                <Ionicons name="fitness" size={32} color="white" />
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Navigation Menu */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Menú Principal</Text>
                        <View style={styles.menuGrid}>
                            <MenuButton
                                icon="fitness"
                                title="Mis Rutinas"
                                subtitle="Ver y crear rutinas"
                                color="#FFC107"
                                onPress={() => router.push('/screens/my-routines')}
                            />
                            <MenuButton
                                icon="time-outline"
                                title="Historial"
                                subtitle="Tu progreso"
                                color="#2196F3"
                                onPress={() => router.push('/screens/history')}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

interface MenuButtonProps {
    icon: React.ComponentProps<typeof Ionicons>["name"];
    title: string;
    subtitle: string;
    color: string;
    onPress: () => void;
}

function MenuButton({ icon, title, subtitle, color, onPress }: MenuButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.menuButton, { borderColor: `${color}55` }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={[styles.menuIconContainer, { backgroundColor: `${color}22` }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <Text style={styles.menuButtonTitle}>{title}</Text>
            <Text style={styles.menuButtonSubtitle}>{subtitle}</Text>
        </TouchableOpacity>
    );
}