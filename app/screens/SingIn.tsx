import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { loginUser } from "../services/auth";

export default function SignInScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Por favor ingresa tus credenciales");
            return;
        }

        setLoading(true);
        try {
            const data = await loginUser(username, password);
            Alert.alert("Éxito", "Inicio de sesión exitoso ✅");
            console.log("Tokens:", data);
            router.replace("/screens/TrainingLevelFormScreen");
        } catch (err: any) {
            Alert.alert("Error", err.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
                <ScrollView contentContainerStyle={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            activeOpacity={0.8}
                            style={styles.backButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="#FFC107" />
                        </TouchableOpacity>
                    </View>

                    {/* Icon */}
                    <View style={styles.iconContainer}>
                        <View style={styles.iconCircle}>
                            <FontAwesome name="user" size={60} color="#FFC107" />
                        </View>
                    </View>

                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <Text style={styles.subtitle}>Ingresa tus credenciales para continuar</Text>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIcon}>
                            <Ionicons name="mail-outline" size={20} color="#FFC107" />
                        </View>
                        <TextInput
                            placeholder="Correo electrónico"
                            placeholderTextColor="#666"
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIcon}>
                            <Ionicons name="lock-closed-outline" size={20} color="#FFC107" />
                        </View>
                        <TextInput
                            placeholder="Contraseña"
                            placeholderTextColor="#666"
                            secureTextEntry={!showPassword}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                            activeOpacity={0.8}
                        >
                            <Ionicons
                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                size={20}
                                color="#AAA"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity
                        style={styles.forgotPassword}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#FFC107', '#FF9800']}
                            style={styles.gradient}
                        >
                            {loading ? (
                                <ActivityIndicator color="#0D0D0D" size="small" />
                            ) : (
                                <View style={styles.buttonContent}>
                                    <FontAwesome name="sign-in" size={20} color="#0D0D0D" />
                                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                                </View>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 32,
        paddingTop: 60,
    },
    header: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,193,7,0.3)",
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    iconCircle: {
        padding: 30,
        borderRadius: 100,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderWidth: 2,
        borderColor: "rgba(255,193,7,0.3)",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFF",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#AAA",
        textAlign: "center",
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "rgba(255,193,7,0.3)",
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: "#FFF",
        fontSize: 16,
        height: "100%",
    },
    eyeIcon: {
        padding: 8,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: "#FFC107",
        fontSize: 14,
        fontWeight: "600",
    },
    button: {
        width: "100%",
        height: 56,
        borderRadius: 28,
        overflow: "hidden",
        marginBottom: 20,
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0D0D0D",
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    registerText: {
        color: "#AAA",
        fontSize: 14,
    },
    registerLink: {
        color: "#FFC107",
        fontSize: 14,
        fontWeight: "600",
    },
});