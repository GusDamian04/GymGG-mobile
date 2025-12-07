import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Importar AsyncStorage para limpiar el token
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        marginBottom: 24, // Aumenta este valor (prueba con 24, 28 o 32)
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
    menuButtonSpacer: {
        flex: 1,
    },
});

export default function HomeScreen() {
    const router = useRouter();
    // En una aplicación real, este estado vendría del contexto de autenticación
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
                    onPress: async () => {
                        try {
                            // LIMPIEZA DEL TOKEN: Borrar el token de AsyncStorage
                            await AsyncStorage.removeItem('user_auth_token');
                            await AsyncStorage.removeItem('user_id');
                            
                            // Navegar de vuelta a la pantalla de inicio de sesión
                            router.replace('/screens/SingIn');
                        } catch (e) {
                            console.error("Error al cerrar sesión", e);
                            Alert.alert("Error", "No se pudo limpiar la sesión.");
                        }
                    },
                },
            ]
        );
    };

    const navigateToRoutines = () => {
        // En una app real, la ruta sería /screens/routine-list
         router.replace("/screens/my-routines1")
    };

    const navigateToHistory = () => {
        Alert.alert('Próximamente', 'Esta función de Historial estará disponible pronto 🚀');
    };
    
    const navigateToPerfil =()=> {
        router.replace("/screens/profile")
    }

    // Esto es un placeholder para una acción más compleja
    const createNewRoutine = () => {
        Alert.alert('Crear Rutina', 'Iniciando proceso de creación de rutina.');
        // router.push({
        //     pathname: '/screens/routine-details',
        //     params: { ... },
        // } as any);
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
                            <TouchableOpacity
                            onPress={navigateToPerfil}
                            activeOpacity={0.9}>

                            <Ionicons name="person" size={28} color="#FFC107" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerText}>
                            <Text style={styles.greeting}>Hola, {userName}! 👋</Text>
                            <Text style={styles.subtitle}>Bienvenido a tu gimnasio virtual</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={handleLogout}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="log-out-outline" size={20} color="#F44336" />
                        </TouchableOpacity>
                    </View>

                    {/* Welcome Card (Llamada a la Acción) */}
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
                        <Text style={styles.sectionTitle}>Navegación Rápida</Text>
                        <View style={styles.menuGrid}>
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <MenuButton
                                    icon="barbell"
                                    title="Mis Rutinas"
                                    subtitle="Ver y crear planes"
                                    color="#FFC107"
                                    onPress={navigateToRoutines}
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <MenuButton
                                    icon="stats-chart"
                                    title="Progreso"
                                    subtitle="Analiza tu historial"
                                    color="#2196F3"
                                    onPress={()=> router.replace("/screens/training-complete")}
                                />
                            </View>
                        </View>
                        
                        <View style={styles.menuGrid}>
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <MenuButton
                                    icon="fitness"
                                    title="Ejercicios"
                                    subtitle="Explora ejercicios"
                                    color="#FFC107"
                                    onPress={()=> router.replace("/screens/exercises-list")}
                                />
                            </View>
                            {/* Spacer invisible para mantener el tamaño */}
                            <View style={styles.menuButtonSpacer} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

// Componente auxiliar para botones de menú
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