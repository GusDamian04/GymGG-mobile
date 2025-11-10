import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { loginUser } from "../services/auth";

export default function SignInScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
            // aquí podrías navegar al Home o Dashboard
        } catch (err: any) {
            Alert.alert("Error", err.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                placeholder="Correo"
                placeholderTextColor="#aaa"
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                secureTextEntry
                style={styles.input}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        padding: 24,
    },
    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 40,
    },
    input: {
        backgroundColor: "#1E1E1E",
        color: "#fff",
        borderRadius: 12,
        padding: 14,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#333",
    },
    button: {
        backgroundColor: "#FF6B00",
        paddingVertical: 16,
        borderRadius: 12,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
});


// Deje esto para ver si iniciar sesión por nombre de usuario o por email(actualmente es por email))