import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // <<--- IMPORTANTE

export default function LoginScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <LinearGradient colors={["#0D0D0D", "#1C1C1C"]} style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
                <ScrollView contentContainerStyle={styles.content}>

                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Image
                                source={require("@/assets/images/logo.png")}
                                style={styles.logo}
                            />
                        </View>
                    </View>

                    <Text style={styles.title}>Bienvenido a GymsGG</Text>

                    <CustomButton
                        icon="user"
                        text="Iniciar sesión"
                        outlined
                        onPress={() => router.replace("/screens/SingIn")}
                    />

                </ScrollView>
            </Animated.View>
        </LinearGradient>
    );
}

function CustomButton({
    icon,
    text,
    onPress,
    outlined,
}: {
    icon: keyof typeof FontAwesome.glyphMap;
    text: string;
    onPress: () => void;
    outlined?: boolean;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                styles.button,
                outlined ? styles.buttonOutlined : styles.buttonFilled,
            ]}
        >
            {outlined ? (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <FontAwesome name={icon} size={20} color="#FFC107" />
                    <Text style={[styles.buttonText, styles.outlinedText]}>{text}</Text>
                </View>
            ) : (
                <LinearGradient
                    colors={["#FFC107", "#FF9800"]}
                    style={styles.gradient}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <FontAwesome name={icon} size={20} color="#FFC107" />
                        <Text style={styles.buttonText}>{text}</Text>
                    </View>
                </LinearGradient>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
    },
    logoContainer: {
        marginBottom: 40,
    },
    logoCircle: {
        padding: 20,
        borderRadius: 100,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderWidth: 2,
        borderColor: "rgba(255,193,7,0.3)",
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF",
        textAlign: "center",
        marginVertical: 40,
    },
    button: {
        width: "100%",
        height: 55,
        borderRadius: 30,
        overflow: "hidden",
        marginBottom: 16,
    },
    gradient: {
        flex: 1,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonFilled: {},
    buttonOutlined: {
        borderWidth: 2,
        borderColor: "#FFC107",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFC107",
    },
    outlinedText: {
        color: "#FFC107", 
    },
});
